import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import surveillanceAuditAbi from "./abi/SurveillanceAudit.json";
import identityRegistryAbi from "./abi/IdentityRegistry.json";
import { AlertRecord, RegisterAlertResult } from "./interfaces/alert-record.interface";

/**
 * Encapsula toda a interacao com o contrato `SurveillanceAudit` via
 * ethers.js. E o unico ponto do backend que conhece detalhes de blockchain
 * (provider, wallet, ABI) — o restante da aplicacao (camada `/alerts`)
 * trabalha apenas com objetos JS simples (`AlertRecord`).
 */
@Injectable()
export class BlockchainService implements OnModuleInit {
  private readonly logger = new Logger(BlockchainService.name);

  private provider: JsonRpcProvider;
  private wallet: Wallet;
  private auditContract: Contract;
  private identityContract: Contract;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const rpcUrl = this.configService.get<string>("RPC_URL", "http://127.0.0.1:8545");
    const auditAddress = this.configService.getOrThrow<string>("CONTRACT_ADDRESS");
    const identityAddress = this.configService.getOrThrow<string>("IDENTITY_REGISTRY_ADDRESS");
    const privateKey = this.configService.getOrThrow<string>("ADMIN_PRIVATE_KEY");

    this.provider = new JsonRpcProvider(rpcUrl);
    // A wallet de administracao assina TODAS as transacoes de escrita.
    this.wallet = new Wallet(privateKey, this.provider);
    
    // O Hardhat exporta o artefato completo com bytecode. O Ethers precisa da propriedade .abi
    this.auditContract = new Contract(auditAddress, surveillanceAuditAbi.abi, this.wallet);
    this.identityContract = new Contract(identityAddress, identityRegistryAbi.abi, this.wallet);

    this.logger.log(`Conectado ao no RPC em ${rpcUrl}`);
    this.logger.log(`Contrato SurveillanceAudit em ${auditAddress}`);
    this.logger.log(`Contrato IdentityRegistry em ${identityAddress}`);
    this.logger.log(`Assinando transacoes com a conta ${this.wallet.address}`);
  }

  /**
   * Envia a transacao de escrita `registerAlert` e aguarda a confirmacao.
   * Os dados retornados pelo evento `AlertRegistered` (emitido pelo
   * contrato) sao usados para montar a resposta, evitando uma segunda
   * chamada de leitura ao no.
   */
  async registerAlert(
    cameraId: string,
    timestamp: number,
    alertType: string,
    imageHash: string,
    identityHash: string,
  ): Promise<RegisterAlertResult> {
    const tx = await this.auditContract.registerAlert(cameraId, timestamp, alertType, imageHash, identityHash);
    const receipt = await tx.wait();

    const parsedEvent = receipt.logs
      .map((log: any) => {
        try {
          return this.auditContract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find((event: any) => event?.name === "AlertRegistered");

    if (!parsedEvent) {
      throw new Error("Transacao confirmada, mas o evento AlertRegistered nao foi encontrado.");
    }

    const { args } = parsedEvent;

    return {
      id: Number(args.id),
      cameraId: args.cameraId,
      timestamp: Number(args.timestamp),
      alertType: args.alertType,
      imageHash: args.imageHash,
      identityHash: args.identityHash,
      registeredBy: args.registeredBy,
      blockTimestamp: Number(args.blockTimestamp),
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber,
    };
  }

  async getAlert(id: number): Promise<AlertRecord> {
    const raw = await this.auditContract.getAlert(id);
    return this.toAlertRecord(raw);
  }

  async getAllAlerts(): Promise<AlertRecord[]> {
    const raw = await this.auditContract.getAllAlerts();
    return raw.map((item: any) => this.toAlertRecord(item));
  }

  async getAlertsByCamera(cameraId: string): Promise<AlertRecord[]> {
    const raw = await this.auditContract.getAlertsByCamera(cameraId);
    return raw.map((item: any) => this.toAlertRecord(item));
  }

  /** Converte o `Result` retornado pelo ethers.js (com `bigint`) em um objeto JS simples. */
  private toAlertRecord(raw: any): AlertRecord {
    return {
      id: Number(raw.id),
      cameraId: raw.cameraId,
      timestamp: Number(raw.timestamp),
      alertType: raw.alertType,
      imageHash: raw.imageHash,
      identityHash: raw.identityHash,
      registeredBy: raw.registeredBy,
      blockTimestamp: Number(raw.blockTimestamp),
    };
  }

  // --- Identity Registry Methods ---

  /** Retorna todas as identidades cadastradas pela carteira especifica */
  async getIdentitiesByWallet(walletAddress: string): Promise<any[]> {
    const identityHashes = await this.identityContract.getIdentitiesByWallet(walletAddress);
    
    // Busca os dados completos para cada hash retornado
    const identities = [];
    for (const hash of identityHashes) {
      const idData = await this.identityContract.getIdentity(hash);
      identities.push({
        identityHash: idData.identityHash,
        nameHash: idData.nameHash,
        docHash: idData.docHash,
        photoHash: idData.photoHash,
        role: Number(idData.role),
        expiration: Number(idData.expiration),
        registeredBy: idData.registeredBy,
        createdAt: Number(idData.createdAt),
      });
    }
    
    return identities;
  }

  /**
   * Envia uma transacao para cadastrar uma nova identidade.
   */
  async registerIdentity(
    nameHash: string,
    docHash: string,
    photoHash: string,
    isResident: boolean,
  ): Promise<string> {
    const tx = await this.identityContract.registerIdentity(nameHash, docHash, photoHash, isResident);
    const receipt = await tx.wait();

    // Extrai o identityHash do evento emitido
    const parsedEvent = receipt.logs
      .map((log: any) => {
        try {
          return this.identityContract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find((event: any) => event?.name === "IdentityRegistered");

    if (!parsedEvent) {
      throw new Error("Transacao confirmada, mas o evento IdentityRegistered nao foi encontrado.");
    }

    return parsedEvent.args.identityHash;
  }
}
