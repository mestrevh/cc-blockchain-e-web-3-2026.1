import { Module } from "@nestjs/common";
import { BlockchainModule } from "../blockchain/blockchain.module";
import { IdentitiesController } from "./identities.controller";

@Module({
  imports: [BlockchainModule],
  controllers: [IdentitiesController],
})
export class IdentitiesModule {}
