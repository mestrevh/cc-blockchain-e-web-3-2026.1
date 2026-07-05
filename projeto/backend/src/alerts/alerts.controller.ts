import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { AlertsService } from "./alerts.service";
import { CreateAlertDto } from "./dto/create-alert.dto";

@Controller("alerts")
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  /**
   * Recebe um alerta da camada de borda (`/ai`) e o imutabiliza no
   * contrato SurveillanceAudit. A imagem em si nunca chega aqui — apenas
   * o hash SHA-256 (`imageHash`) calculado localmente pela camera.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateAlertDto) {
    return this.alertsService.createAlert(dto);
  }

  /**
   * Lista o historico de alertas direto da blockchain.
   * Uso opcional de `?cameraId=CAM-01` para filtrar por camera.
   */
  @Get()
  async findAll(@Query("cameraId") cameraId?: string) {
    return this.alertsService.findAll(cameraId);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.alertsService.findOne(id);
  }
}
