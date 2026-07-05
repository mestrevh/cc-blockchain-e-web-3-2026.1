# Camada Backend — API Intermediária (NestJS + ethers.js)

Camada 2 da arquitetura: a API que fica entre a borda de IA (`/ai`), o
painel administrativo (`/frontend`) e o contrato `SurveillanceAudit`
(`/blockchain`). É a **única** peça do sistema que guarda a chave privada
de administração e assina transações.

> Visão geral completa da arquitetura: ver [`../ARCHITECTURE.md`](../ARCHITECTURE.md) (Etapa 5).
> Detalhes do contrato consumido aqui: ver [`../blockchain/README.md`](../blockchain/README.md) (Etapa 1).

## Por que uma API intermediária, e não o frontend/borda falando direto com o contrato?

1. **A chave privada de administração nunca sai do servidor.** Nem o
   painel React (`/frontend`, código público no browser) nem a câmera de
   borda (`/ai`) têm acesso a ela — só o backend assina transações.
2. **Validação centralizada**: o backend usa `class-validator` para
   garantir que só dados bem formados (hash SHA-256 válido, categorias de
   alerta conhecidas) cheguem à blockchain, evitando gastar gás com
   transações que o contrato rejeitaria.
3. **Camada de tradução**: o ethers.js retorna `uint256` como `bigint`
   (não serializável em JSON) — o backend converte tudo para tipos JS
   simples antes de expor a API REST.

## Stack

- **NestJS 10** (`@nestjs/common`, `@nestjs/core`, `@nestjs/config`, `@nestjs/platform-express`)
- **ethers.js v6** para toda a interação com a blockchain
- **class-validator** / **class-transformer** para validação dos DTOs

## Estrutura

```
backend/
├── src/
│   ├── main.ts                          # bootstrap, CORS, ValidationPipe global
│   ├── app.module.ts
│   ├── blockchain/
│   │   ├── blockchain.module.ts
│   │   ├── blockchain.service.ts        # provider/wallet/contract via ethers.js
│   │   ├── abi/SurveillanceAudit.json   # ABI copiado do artifact do Hardhat (Etapa 1)
│   │   └── interfaces/alert-record.interface.ts
│   └── alerts/
│       ├── alerts.module.ts
│       ├── alerts.controller.ts         # POST /alerts, GET /alerts, GET /alerts/:id
│       ├── alerts.service.ts
│       └── dto/create-alert.dto.ts      # validação + enum AlertType
├── .env.example
├── nest-cli.json
└── package.json
```

## Configuração (`.env`)

Copie `.env.example` para `.env` e preencha:

```env
PORT=3001
RPC_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=<endereco impresso pelo deploy da Etapa 1>
ADMIN_PRIVATE_KEY=<chave privada de uma conta de teste do Hardhat>
```

`ADMIN_PRIVATE_KEY` deve corresponder à conta usada no deploy do contrato
(ou a outra conta explicitamente autorizada via `authorizeSubmitter`,
função administrativa do contrato) — é ela quem assina `registerAlert`.
As contas de teste (endereço + chave privada) são impressas no console ao
rodar `npx hardhat node`, na camada `/blockchain`.

> ⚠️ Essas chaves só têm valor em uma rede de teste local. Nunca use uma
> chave de carteira real neste `.env`.

## Endpoints

### `POST /alerts`

Registra um novo alerta de forma imutável na blockchain.

**Body:**

```json
{
  "cameraId": "CAM-PORTARIA-01",
  "timestamp": 1751500000,
  "alertType": "PESSOA_NAO_AUTORIZADA",
  "imageHash": "0x426a080de1e030b825bafc2c4e45a8b665a6471ded074aa4d898b961a60af44"
}
```

- `alertType` aceita: `PESSOA_NAO_AUTORIZADA`, `MORADOR_RECONHECIDO`, `VEICULO_DETECTADO`, `ADULTERACAO_DETECTADA`.
- `imageHash` deve ser um SHA-256 em hexadecimal (`0x` + 64 caracteres).

**Resposta `201 Created`** (dados vindos do evento `AlertRegistered` emitido pela transação):

```json
{
  "id": 1,
  "cameraId": "CAM-PORTARIA-01",
  "timestamp": 1751500000,
  "alertType": "PESSOA_NAO_AUTORIZADA",
  "imageHash": "0x426a080de1e030b825bafc2c4e45a8b665a6471ded074aa4d898b961a60af44",
  "registeredBy": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "blockTimestamp": 1783261208,
  "txHash": "0x2774...9133c",
  "blockNumber": 3
}
```

Erros de validação retornam `400`; falhas na blockchain (ex: conta não
autorizada no contrato) também retornam `400` com a mensagem extraída do
erro do ethers.js.

### `GET /alerts`

Lista o histórico completo, lido diretamente do contrato.
Aceita filtro opcional: `GET /alerts?cameraId=CAM-PORTARIA-01`.

### `GET /alerts/:id`

Retorna um alerta específico pelo id sequencial. `404` se não existir.

## Como rodar localmente

Pré-requisito: nó Hardhat rodando e contrato implantado (Etapa 1).

```bash
cd backend
npm install
cp .env.example .env   # depois edite com o endereco do contrato e a chave privada

npm run start:dev
```

A API sobe em `http://localhost:3001` (ou na porta definida em `PORT`).

### Teste rápido via curl

```bash
curl -X POST http://localhost:3001/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "cameraId": "CAM-PORTARIA-01",
    "timestamp": 1751500000,
    "alertType": "PESSOA_NAO_AUTORIZADA",
    "imageHash": "0x426a080de1e030b825bafc2c4e45a8b665a6471ded074aa4d898b961a60af44"
  }'

curl http://localhost:3001/alerts
```

Esse fluxo (deploy do contrato → configurar `.env` → `POST` → `GET`) foi
validado manualmente durante o desenvolvimento desta etapa: a transação
foi assinada, confirmada, e o alerta apareceu corretamente na listagem.

## Próximos passos

Com a API validada, a Etapa 3 (`/ai`) implementará o script Python que
simula a câmera de borda: gera o hash SHA-256 da evidência fictícia e
dispara o `POST /alerts` para este backend.
