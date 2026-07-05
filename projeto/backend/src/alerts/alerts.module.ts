import { Module } from "@nestjs/common";
import { BlockchainModule } from "../blockchain/blockchain.module";
import { AlertsController } from "./alerts.controller";
import { AlertsService } from "./alerts.service";

@Module({
  imports: [BlockchainModule],
  controllers: [AlertsController],
  providers: [AlertsService],
})
export class AlertsModule {}
