import { IsBoolean, IsNotEmpty, Matches } from "class-validator";

export class CreateIdentityDto {
  /** Hash SHA-256 do nome completo */
  @IsNotEmpty()
  @Matches(/^0x[0-9a-fA-F]{64}$/, {
    message: "nameHash deve ser um hash SHA-256 em hexadecimal no formato 0x + 64 caracteres",
  })
  nameHash: string;

  /** Hash SHA-256 do CPF/RG */
  @IsNotEmpty()
  @Matches(/^0x[0-9a-fA-F]{64}$/, {
    message: "docHash deve ser um hash SHA-256 em hexadecimal",
  })
  docHash: string;

  /** Hash SHA-256 da foto do rosto */
  @IsNotEmpty()
  @Matches(/^0x[0-9a-fA-F]{64}$/, {
    message: "photoHash deve ser um hash SHA-256 em hexadecimal",
  })
  photoHash: string;

  /** true para Morador, false para Visitante */
  @IsBoolean()
  isResident: boolean;
}
