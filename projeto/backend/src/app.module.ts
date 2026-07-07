import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AlertsModule } from "./alerts/alerts.module";
import { BlockchainModule } from "./blockchain/blockchain.module";
import { IdentitiesModule } from "./identities/identities.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    BlockchainModule,
    AlertsModule,
    IdentitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
