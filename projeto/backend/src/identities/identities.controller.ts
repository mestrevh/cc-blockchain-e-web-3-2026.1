import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BlockchainService } from "../blockchain/blockchain.service";
import { CreateIdentityDto } from "./dto/create-identity.dto";

@Controller("identities")
export class IdentitiesController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Post()
  async create(@Body() createIdentityDto: CreateIdentityDto) {
    const identityHash = await this.blockchainService.registerIdentity(
      createIdentityDto.nameHash,
      createIdentityDto.docHash,
      createIdentityDto.photoHash,
      createIdentityDto.isResident,
    );

    return {
      message: "Identidade registrada com sucesso na Blockchain",
      identityHash,
    };
  }

  @Get("wallet/:address")
  async getByWallet(@Param("address") address: string) {
    const identities = await this.blockchainService.getIdentitiesByWallet(address);
    return identities;
  }
}
