import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { BlockchainService } from "../blockchain/blockchain.service";
import { AlertRecord, RegisterAlertResult } from "../blockchain/interfaces/alert-record.interface";
import { CreateAlertDto } from "./dto/create-alert.dto";

@Injectable()
export class AlertsService {
  private readonly logger = new Logger(AlertsService.name);

  constructor(private readonly blockchainService: BlockchainService) {}

  /** Assina e envia a transacao que imutabiliza o alerta no contrato. */
  async createAlert(dto: CreateAlertDto): Promise<RegisterAlertResult> {
    try {
      const result = await this.blockchainService.registerAlert(
        dto.cameraId,
        dto.timestamp,
        dto.alertType,
        dto.imageHash,
      );
      this.logger.log(`Alerta #${result.id} registrado (tx ${result.txHash})`);
      return result;
    } catch (error) {
      // Erros comuns aqui: conta nao autorizada (`NotAuthorized`), RPC
      // fora do ar, ou saldo insuficiente para gas. Traduzimos para um
      // 400 com a mensagem mais legivel que o ethers.js conseguir extrair.
      throw new BadRequestException(this.extractErrorMessage(error));
    }
  }

  async findAll(cameraId?: string): Promise<AlertRecord[]> {
    if (cameraId) {
      return this.blockchainService.getAlertsByCamera(cameraId);
    }
    return this.blockchainService.getAllAlerts();
  }

  async findOne(id: number): Promise<AlertRecord> {
    try {
      return await this.blockchainService.getAlert(id);
    } catch {
      throw new NotFoundException(`Alerta com id ${id} nao encontrado.`);
    }
  }

  private extractErrorMessage(error: any): string {
    return (
      error?.shortMessage ??
      error?.reason ??
      error?.message ??
      "Erro ao registrar alerta na blockchain."
    );
  }
}
