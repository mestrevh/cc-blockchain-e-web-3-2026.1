/**
 * Representacao "plana" (JSON-serializavel) de um `Alert` do contrato
 * SurveillanceAudit. O ethers.js retorna `uint256` como `bigint`, que nao
 * pode ser serializado diretamente por `JSON.stringify` — por isso o
 * BlockchainService converte tudo para `number`/`string` antes de
 * devolver os dados para o restante da aplicacao.
 */
export interface AlertRecord {
  id: number;
  cameraId: string;
  timestamp: number;
  alertType: string;
  imageHash: string;
  registeredBy: string;
  blockTimestamp: number;
}

/** Retorno da operacao de escrita, incluindo dados da transacao on-chain. */
export interface RegisterAlertResult extends AlertRecord {
  txHash: string;
  blockNumber: number;
}
