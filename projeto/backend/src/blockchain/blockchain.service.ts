import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import surveillanceAuditAbi from "./abi/SurveillanceAudit.json";
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
  private contract: Contract;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const rpcUrl = this.configService.get<string>("RPC_URL", "http://127.0.0.1:8545");
    const contractAddress = this.configService.getOrThrow<string>("CONTRACT_ADDRESS");
    const privateKey = this.configService.getOrThrow<string>("ADMIN_PRIVATE_KEY");

    this.provider = new JsonRpcProvider(rpcUrl);
    // A wallet de administracao assina TODAS as transacoes de escrita.
    // E ela quem precisa estar autorizada (`authorizedSubmitters`) no
    // contrato — na pratica, a mesma conta usada no deploy (Etapa 1).
    this.wallet = new Wallet(privateKey, this.provider);
    this.contract = new Contract(contractAddress, surveillanceAuditAbi, this.wallet);

    this.logger.log(`Conectado ao no RPC em ${rpcUrl}`);
    this.logger.log(`Contrato SurveillanceAudit em ${contractAddress}`);
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
  ): Promise<RegisterAlertResult> {
    const tx = await this.contract.registerAlert(cameraId, timestamp, alertType, imageHash);
    const receipt = await tx.wait();

    const parsedEvent = receipt.logs
      .map((log: any) => {
        try {
          return this.contract.interface.parseLog(log);
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
      registeredBy: args.registeredBy,
      blockTimestamp: Number(args.blockTimestamp),
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber,
    };
  }

  async getAlert(id: number): Promise<AlertRecord> {
    const raw = await this.contract.getAlert(id);
    return this.toAlertRecord(raw);
  }

  async getAllAlerts(): Promise<AlertRecord[]> {
    const raw = await this.contract.getAllAlerts();
    return raw.map((item: any) => this.toAlertRecord(item));
  }

  async getAlertsByCamera(cameraId: string): Promise<AlertRecord[]> {
    const raw = await this.contract.getAlertsByCamera(cameraId);
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
      registeredBy: raw.registeredBy,
      blockTimestamp: Number(raw.blockTimestamp),
    };
  }
}
