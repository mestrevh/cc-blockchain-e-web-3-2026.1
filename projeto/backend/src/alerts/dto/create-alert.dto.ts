import { IsEnum, IsInt, IsNotEmpty, IsPositive, IsString, Matches, MaxLength } from "class-validator";

/**
 * Categorias de alerta suportadas. O contrato armazena `alertType` como
 * `string` (para nao exigir upgrade a cada nova categoria), mas o backend
 * valida contra um enum fechado para evitar que a borda (`/ai`) envie
 * valores inconsistentes (ex: erros de digitacao) para a blockchain.
 */
export enum AlertType {
  UNAUTHORIZED_PERSON = "PESSOA_NAO_AUTORIZADA",
  RESIDENT_RECOGNIZED = "MORADOR_RECONHECIDO",
  AUTHORIZED_PERSON = "PESSOA_AUTORIZADA",
}

export class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  cameraId: string;

  /** Unix epoch (segundos) do momento da deteccao, segundo a borda. */
  @IsInt()
  @IsPositive()
  timestamp: number;

  @IsEnum(AlertType, {
    message: `alertType deve ser um dos valores: ${Object.values(AlertType).join(", ")}`,
  })
  alertType: AlertType;

  /** Hash SHA-256 da evidencia, em hexadecimal (0x + 64 caracteres = 32 bytes). */
  @IsNotEmpty()
  @Matches(/^0x[0-9a-fA-F]{64}$/, {
    message: "imageHash deve ser um hash SHA-256 em hexadecimal no formato 0x + 64 caracteres",
  })
  imageHash: string;

  /** Hash do contrato/identidade da pessoa que gerou o alerta. Se nao for uma pessoa, um hash generico ou zero pode ser esperado dependendo da regra de negocio. */
  @IsNotEmpty()
  @Matches(/^0x[0-9a-fA-F]{64}$/, {
    message: "identityHash deve ser um hash SHA-256 em hexadecimal",
  })
  identityHash: string;
}
