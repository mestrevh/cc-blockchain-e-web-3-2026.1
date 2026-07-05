import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BlockchainModule } from "./blockchain/blockchain.module";
import { AlertsModule } from "./alerts/alerts.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    BlockchainModule,
    AlertsModule,
  ],
})
export class AppModule {}
