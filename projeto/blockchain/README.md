# Camada Blockchain — `SurveillanceAudit`

Camada 1 da arquitetura: o contrato inteligente que serve como livro-caixa
imutável de auditoria para os alertas de vigilância gerados pela borda
(`/ai`) e submetidos pelo backend (`/backend`).

> Visão geral completa da arquitetura, justificativas de projeto e
> conformidade com a LGPD: ver [`../ARCHITECTURE.md`](../ARCHITECTURE.md)
> (entregue na Etapa 5).

## Stack

- **Solidity** `0.8.26`
- **Hardhat** `^2.22.x` + `@nomicfoundation/hardhat-toolbox` (inclui
  ethers v6, chai matchers, network helpers, etc.)
- Rede local via `npx hardhat node` (chainId `31337`)

## Estrutura

```
blockchain/
├── contracts/
│   └── SurveillanceAudit.sol   # contrato principal
├── scripts/
│   └── deploy.js               # script de deploy para a rede localhost
├── hardhat.config.js
└── package.json
```

## O contrato `SurveillanceAudit.sol`

### Struct `Alert`

| Campo            | Tipo      | Descrição                                                                 |
|-------------------|-----------|----------------------------------------------------------------------------|
| `id`              | `uint256` | Identificador sequencial (começa em 1).                                   |
| `cameraId`        | `string`  | Identificador da câmera de borda (ex: `"CAM-PORTARIA-01"`).               |
| `timestamp`       | `uint256` | Momento da detecção, segundo o relógio do dispositivo de borda (epoch).   |
| `alertType`       | `string`  | Categoria do alerta (ex: `"PESSOA_NAO_AUTORIZADA"`, `"MORADOR_RECONHECIDO"`). |
| `imageHash`       | `bytes32` | Hash **SHA-256** da evidência (imagem). A imagem nunca é enviada on-chain. |
| `registeredBy`    | `address` | Conta que assinou a transação de registro (wallet do backend).            |
| `blockTimestamp`  | `uint256` | Timestamp do bloco em que o alerta foi minerado (não falsificável).       |

`timestamp` (borda) e `blockTimestamp` (rede) são mantidos separados de
propósito: permitem auditar divergência entre "quando o evento ocorreu" e
"quando foi imutabilizado", sem que isso afete a prova de integridade do
hash.

### Controle de acesso

- `owner`: endereço que fez o deploy (na prática, a wallet de administração
  gerenciada pelo backend NestJS).
- `authorizedSubmitters[address]`: mapeamento de endereços autorizados a
  escrever novos alertas. O `owner` já nasce autorizado.
- `authorizeSubmitter(address)` / `revokeSubmitter(address)`: apenas o
  `owner` pode conceder/revogar permissão de escrita — protege o histórico
  contra alertas forjados por contas não confiáveis.
- **Leitura é pública**: qualquer conta pode consultar o histórico, o que
  garante transparência para síndicos/auditores sem depender do backend.

### Funções de escrita

- `registerAlert(string cameraId, uint256 timestamp, string alertType, bytes32 imageHash) → uint256 id`
  Restrita a `onlyAuthorized`. Valida campos obrigatórios e grava o alerta
  de forma permanente. Emite `AlertRegistered`.

### Funções de leitura

- `getAlert(uint256 id) → Alert`
- `getAllAlerts() → Alert[]`
- `getAlertsPaginated(uint256 offset, uint256 limit) → Alert[]`
- `getAlertsByCamera(string cameraId) → Alert[]`
- `totalAlerts() → uint256` (getter público da variável de estado)
- `authorizedSubmitters(address) → bool` (getter público)

### Eventos

- `AlertRegistered(uint256 indexed id, string cameraId, string alertType, bytes32 imageHash, uint256 timestamp, address indexed registeredBy, uint256 blockTimestamp)`
- `SubmitterAuthorized(address indexed submitter, address indexed authorizedBy)`
- `SubmitterRevoked(address indexed submitter, address indexed revokedBy)`
- `OwnershipTransferred(address indexed previousOwner, address indexed newOwner)`

> `cameraId` e `alertType` são propositalmente **não indexados** no evento
> `AlertRegistered`: tipos dinâmicos (`string`) quando indexados armazenam
> apenas o `keccak256` do valor no tópico do log, o que impediria o
> backend de decodificar a string original ao escutar o evento via
> ethers.js.

### Por que sem imagens/biometria on-chain?

A borda (`/ai`) calcula um hash **SHA-256** da evidência localmente e
envia apenas esse hash (32 bytes → `bytes32`) para o backend, que por sua
vez o grava no contrato. Isso:

1. Elimina custo de gás proibitivo de armazenar blobs binários on-chain.
2. Evita que dados biométricos/pessoais (protegidos pela LGPD) sejam
   replicados em um livro público e imutável — a blockchain nunca guarda
   a imagem, apenas a prova de que ela existiu e não foi alterada.
3. Mantém a propriedade de auditoria: se alguém alterar a imagem original
   armazenada fora da chain, o hash recalculado não baterá mais com o
   `imageHash` gravado, expondo a adulteração.

## Como rodar localmente

```bash
cd blockchain
npm install

# Terminal 1 — inicia o nó local do Hardhat (mantém rodando)
npx hardhat node

# Terminal 2 — compila e faz o deploy na rede local
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

O script de deploy imprime o **endereço do contrato**. Guarde esse valor:
ele (junto com o ABI gerado em `artifacts/contracts/SurveillanceAudit.sol/SurveillanceAudit.json`)
será usado pela camada `/backend` (Etapa 2) para se conectar ao contrato
via ethers.js.

A conta `accounts[0]` fornecida pelo Hardhat (impressa também pelo comando
`npx hardhat node`) é o `owner`/primeiro `authorizedSubmitter`. Sua chave
privada (exibida no console do `hardhat node`, **apenas em ambiente de
desenvolvimento local**) deve ser configurada no `.env` do backend.

## Próximos passos

Com o contrato, o script de deploy e este README validados, a Etapa 2
(`/backend`) implementará o serviço NestJS que assina transações com essa
conta e expõe `POST /alerts` e `GET /alerts` para o restante do sistema.
