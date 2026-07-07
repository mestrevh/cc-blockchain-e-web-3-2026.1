# ETAPA 6 - Auto-Refresh no Frontend (Polling)

## Objetivo
Adicionar uma funcionalidade de auto-refresh no Painel Administrativo em React, para que os novos alertas de segurança (registrados na Blockchain via Câmera/AI) apareçam automaticamente na tela do síndico sem precisar recarregar a página (F5).

## Tarefas
- [x] Modificar o arquivo `projeto/frontend/src/components/AlertTable.jsx`.
- [x] Implementar um mecanismo de **Short Polling** utilizando `setInterval` dentro do `useEffect`.
- [x] Configurar o intervalo para atualizar os dados a cada 5 segundos usando a função nativa `fetch`, mantendo a reatividade do React e respeitando a regra `react-frontend-rules.md`.
- [x] Garantir que o `setInterval` seja limpo (cleanup) no `unmount` do componente para evitar vazamento de memória (memory leak).

## Contexto Obrigatório
- **Regras do Agente**: Aplicar regras de design e `fetch` nativo do `projeto/.agents/rules/react-frontend-rules.md`.
- **Git Workflow** (`projeto/.agents/skills/git-workflow/SKILL.md`): 
  - [x] Criar a branch exclusiva `feat/WEB3-006-auto-refresh` a partir da `develop`.
  - [x] Ao final, commitar as alterações nela isoladamente.

## Restrições
- Não utilizar bibliotecas externas de WebSocket (Socket.io) ou React Query. O objetivo é manter o frontend ultra-leve utilizando Vanilla React + `fetch` puro.
