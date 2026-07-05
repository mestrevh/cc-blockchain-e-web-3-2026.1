import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // O frontend (camada /frontend) roda em outra origem (ex: localhost:5173),
  // logo precisa de CORS liberado para consumir esta API.
  app.enableCors();

  // Validacao global dos DTOs de entrada (ex: CreateAlertDto). `whitelist`
  // descarta campos nao declarados no DTO e `transform` converte tipos
  // primitivos (ex: string -> number) automaticamente.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = configService.get<number>("PORT", 3001);
  await app.listen(port);
  console.log(`Backend SurveillanceAudit rodando em http://localhost:${port}`);
}

bootstrap();
