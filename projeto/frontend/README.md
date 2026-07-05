# Camada Frontend (React + Vite) — `/frontend`

Camada 4 da arquitetura: Painel Administrativo de Segurança para consulta de histórico imutável.

## Propósito
Este módulo permite que síndicos e auditores visualizem todos os alertas de segurança que foram capturados pelas câmeras Edge (Etapa 3) e minerados na Blockchain (Etapa 1).

Atendendo às especificações:
- O painel é estritamente de leitura (Read-Only). O frontend não assina transações na rede.
- Os dados são consumidos via API intermediária (`/alerts`), garantindo o isolamento da rede.
- Interface Dark Mode premium.

## Como Executar Localmente

```bash
cd frontend
npm install
npm run dev
```

Acesse o endereço exibido no terminal (geralmente `http://localhost:5173`).

> **Nota de Integração**: Como os alertas vêm da API, certifique-se de que o backend NestJS (Etapa 2) esteja rodando em `http://localhost:3000`. Caso contrário, a UI exibirá o estado de erro "Servidor Indisponível", o que é o comportamento esperado.
