# Plataforma de Auditoria de Vigilância Web3 (Condomínios)

Bem-vindo ao repositório do Projeto Final de Blockchain 2026.1.
Esta arquitetura de 4 camadas foi construída visando resolver o problema de segurança física e auditoria de registros sensíveis usando a imutabilidade descentralizada.

## 🏗 Estrutura das Camadas

- **`/blockchain` (Etapa 1)**: Contrato Inteligente `SurveillanceAudit.sol` implantado via Hardhat.
- **`/backend` (Etapa 2)**: API intermediária em NestJS que assina e despacha as transações para a Blockchain usando `ethers.js`.
- **`/ai` (Etapa 3)**: Simulador do dispositivo Edge. Escrito em Python (`uv`), ele roda o modelo (mock), faz o hash da imagem para preservar a LGPD, e aciona o Backend.
- **`/frontend` (Etapa 4)**: Painel de Controle React/Vite de leitura passiva para administradores.

---

## 🚀 Tutorial: Como Orquestrar os 4 Terminais (Deploy Completo)

Para testar a arquitetura ponta a ponta localmente, você precisará abrir **4 terminais diferentes** e rodar os comandos a seguir em ordem.

### Terminal 1: Inicializando a Blockchain e o Deploy Automático
Para facilitar, criamos um comando unificado que sobe a rede Ethereum local e já faz o deploy do contrato inteligente em seguida, tudo no mesmo terminal!
```bash
cd projeto/blockchain
npm run start
```
*(Deixe este terminal aberto. Ele subirá o nó, aguardará 3 segundos e fará o deploy. O endereço do contrato será impresso na tela. Copie-o para o `.env` do Backend).*

### Terminal 2: Inicializando a API Backend
O Backend é a ponte segura que possui acesso de escrita à blockchain. Verifique o arquivo `.env` para colocar os valores corretos ao fazer o deploy
```bash
cd projeto/backend
# Certifique-se de configurar as variáveis de ambiente (.env) necessárias
npm i
npm run start:dev
```
*(Ele ficará ouvindo requisições na porta 3000).*

### Terminal 3: Simulador de Câmera (Edge AI)
Agora, vamos "ligar" a câmera do condomínio que começará a disparar detecções.
```bash
cd projeto/ai
# Utiliza o gerenciador uv para subir o ambiente isolado
uv run edge_camera.py
```
*(Você verá logs de eventos simulados a cada 5-15 segundos. Se o backend estiver online, ele gravará com sucesso na blockchain!).*

### Terminal 4: Painel Administrativo de Auditoria (React UI)
Finalmente, o síndico quer visualizar a tabela imutável.
```bash
cd projeto/frontend
npm run dev
```
*(Acesse o link `http://localhost:5173` no navegador e maravilhe-se com o Dark Mode).*

---

> **Dúvidas sobre o funcionamento técnico?** 
> Consulte o arquivo `ARCHITECTURE.md` na raiz deste projeto para ler o estudo completo sobre LGPD, otimização de gás e o uso de criptografia (hashes).