**Disciplina:** Blockchain e Web 3.0
**Vídeo de Referência:** @[aulas/videos/Aula 8 - Introdução à Web 3.0 (Parte 2).mp4]

### 📌 1. Visão Geral e Objetivos
* **Contexto:** Esta aula é focada na preparação completa e configuração detalhada do ambiente local de desenvolvimento para a Web 3.0. O objetivo é instalar as dependências necessárias, configurar a depuração integrada entre a IDE e o navegador Chrome, criar a carteira digital na MetaMask e rodar um nó simulador de blockchain local através do Hardhat.
* **Objetivos de Aprendizagem:** O aluno deve ser capaz de instalar e gerenciar versões do Node.js, configurar o VS Code e o Google Chrome para depuração remota via console integrado, configurar e gerenciar chaves públicas/privadas na carteira MetaMask, simular uma rede blockchain com o Hardhat em sua máquina local e importar contas ricas para transações de testes.

### 🔑 2. Conceitos-Chave e Definições
* **NVM (Node Version Manager):** Ferramenta de linha de comando que gerencia múltiplas versões instaladas do Node.js, permitindo alternar de versão conforme a necessidade de cada projeto.
* **Solidity (by Nomic Foundation):** Extensão oficial do VS Code para desenvolvimento em Solidity que oferece suporte à linguagem e ao ecossistema Hardhat (realce de sintaxe, formatação e verificação de erros).
* **Launch Configuration (`launch.json`):** Arquivo de configuração do VS Code localizado na pasta `.vscode/` que estabelece as regras e portas de rede para depuração de aplicativos.
* **Remote Debugging Port:** Configuração que expõe uma porta de comunicação em uma instância do Chrome (ex: porta `9222`) para permitir que o depurador do VS Code interaja diretamente com o console do navegador.
* **Alias (Apelido):** Comando curto e personalizado configurado no terminal do sistema operacional que simplifica a execução de linhas de comando extensas e complexas.
* **Secret Recovery Phrase (Seed Phrase):** Frase de recuperação secreta composta por 12 palavras aleatórias usada como semente criptográfica para gerar a chave privada e recuperar a carteira digital.
* **Import Account (Importar Conta):** Ação de adicionar à carteira local (MetaMask) o controle de uma conta externa já existente na blockchain a partir de sua **chave privada** de texto hexadecimal.
* **Hardhat:** Framework de desenvolvimento em JavaScript/TypeScript para a rede Ethereum que provê ferramentas para compilação, deploy e simulação local de blockchain.
* **Nó Local de Blockchain (Hardhat Node):** Blockchain emulada e executada na máquina de desenvolvimento (porta `8545`) que fornece carteiras fictícias e simula o processamento e a validação de transações sem custos reais.
* **Chain ID (ID de Rede):** Número de identificação único associado a cada rede blockchain (ex: `31337` para a blockchain de testes local do Hardhat) para garantir a segurança e evitar transações replicadas em ambientes incorretos.

### 📝 3. Explicação Detalhada por Tópicos

* **Gerenciamento do Node.js e Instalações no Sistema:**
  * O professor inicia a aula orientando sobre a importância do controle de versões no Node.js.
  * O uso do **NVM (Node Version Manager)** é recomendado por dar flexibilidade ao desenvolvedor de alternar entre versões sem gerar conflitos no sistema operacional. Para Linux/WSL, a instalação do Node e npm também pode ser realizada diretamente via gerenciador de pacotes (`sudo apt install nodejs npm`).
  
* **Extensões Fundamentais para Desenvolvimento no VS Code:**
  * O setup do editor exige extensões vitais para o fluxo de trabalho da disciplina:
    * **ETH over:** Extensão para interações e consultas na rede Ethereum.
    * **Prettier - Code formatter:** Automatiza a formatação do código em padrões consistentes.
    * **Mermaid Preview:** Renderiza diagramas de fluxos desenhados em Markdown.
    * **Solidity (da Nomic Foundation):** Essencial para realce de sintaxe, linting de contratos inteligentes e integração nativa com o Hardhat.

* **Depuração Integrada com Chrome Remote Debugging:**
  * A fim de agilizar o desenvolvimento e evitar a mudança constante de janelas para inspecionar erros, configura-se a depuração remota do Google Chrome diretamente no VS Code.
  * O Chrome deve ser iniciado via linha de comando expondo a porta de depuração: `google-chrome --remote-debugging-port=9222`.
  * Cria-se um arquivo de inicialização [launch.json](file:///Ubuntu/home/victorhugo/cc-blockchain-e-web-3-2026.1/aulas/pratica/.vscode/launch.json) dentro da pasta `.vscode/` com as seguintes propriedades:
    ```json
    {
      "version": "0.2.0",
      "configurations": [
        {
          "type": "chrome",
          "request": "attach",
          "name": "Chrome: anexar (porta 9222)",
          "port": 9222,
          "webRoot": "${workspaceFolder:Codes}/aula-1/frontend",
          "urlFilter": "http://localhost:3000/*"
        }
      ]
    }
    ```
  * Executando esse perfil de debug no VS Code, todas as mensagens, saídas de erro e logs do console do Chrome são capturados e impressos diretamente no painel **Debug Console** da IDE.

* **Instalação da Carteira MetaMask e Guarda de Chaves:**
  * Demonstra-se o download e a ativação da extensão **MetaMask** na Chrome Web Store.
  * O professor executa o passo a passo de criação de uma nova carteira local (com senha de no mínimo 8 caracteres) e explica a segurança da frase secreta de recuperação de 12 palavras.
  * Enfatiza-se que as 12 palavras representam o único modo de restabelecimento do saldo e das chaves caso o dispositivo físico seja danificado ou formatado.

* **Inicialização e Simulação da Blockchain Local com o Hardhat:**
  * Para simular o ecossistema descentralizado, cria-se na raiz do projeto o arquivo [hardhat.config.js](file:///Ubuntu/home/victorhugo/cc-blockchain-e-web-3-2026.1/aulas/pratica/aula-1/hardhat.config.js):
    ```javascript
    require("@nomicfoundation/hardhat-toolbox");
    
    module.exports = {
      solidity: "0.8.20",
      defaultNetwork: "hardhat",
      networks: {
        hardhat: {},
        localhost: {
          url: "http://127.0.0.1:8545",
          chainId: 31337,
        },
      },
    };
    ```
  * O arquivo [package.json](file:///Ubuntu/home/victorhugo/cc-blockchain-e-web-3-2026.1/aulas/pratica/aula-1/package.json) gerencia os scripts de automação. Executando `npm run chain` (que por baixo roda `npx hardhat node`), inicializa-se a simulação local da blockchain.
  * O nó local do Hardhat cria 20 carteiras de teste contendo **10.000 ETH** fictícios cada uma, mostrando no terminal tanto a chave pública quanto a chave privada de cada conta.

* **Configuração de Rede Customizada e Importação de Conta:**
  * Copia-se a chave privada da primeira conta (`Account #0`) gerada no terminal do Hardhat e importa-se na MetaMask utilizando a opção "Importar Conta" (colando a string hexadecimal).
  * Adiciona-se uma rede personalizada na MetaMask informando os parâmetros do nó Hardhat:
    * **Network Name:** Hardhat Local (ou nome à escolha)
    * **RPC URL:** `http://127.0.0.1:8545`
    * **Chain ID:** `31337`
    * **Símbolo:** `ETH`
  * Feito isso, a carteira MetaMask se conectará ao simulador local exibindo o saldo de 10.000 ETH da conta importada. Ao rodar o frontend da aplicação (`npm run frontend:dev` na porta `3000`), a página reconhece e conecta-se via MetaMask exibindo o endereço da conta e o Chain ID `31337`.

### 💡 4. Exemplos Práticos e Analogias
* **Analogia do Alias (Atalho):** Configurar um `alias` no terminal para abrir o navegador em modo debug (`google-chrome --remote-debugging-port=9222`) é como programar a discagem rápida do telefone celular. Em vez de digitar manualmente um número longo e difícil de lembrar, você apenas clica em um atalho curto de teclado.
* **A Simulação de Voo do Hardhat:** O Hardhat funciona como um simulador de voo para pilotos de avião. O desenvolvedor não deve fazer seus testes de contratos e transações diretamente na rede principal (Mainnet) com dinheiro real. O simulador provê um painel de controle (nó local) com combustível infinito e sem riscos (ETH fake de teste) para que tudo seja validado com segurança.
* **Importando Identidades:** A chave privada atua como uma assinatura digital. Ao copiar a chave privada fornecida pelo Hardhat e colá-la na MetaMask, o programador está importando a "identidade digital" daquela conta rica do simulador para dentro do seu gerenciador pessoal de carteiras.

### 🎯 5. Resumo dos Pontos Críticos (O que vai cair na prova)
* A necessidade de um ambiente controlado para blockchain, diferenciando os benefícios de usar o **Hardhat** (simulação local e gratuita) frente às desvantagens de testar diretamente na rede principal (Mainnet com taxas reais).
* O processo e propriedades exigidas para conexão remota de console: uso de `--remote-debugging-port=9222` e a configuração de attach na porta `9222` no `launch.json`.
* Os parâmetros obrigatórios e exatos para configurar a rede local do Hardhat na MetaMask: RPC URL `http://127.0.0.1:8545` e Chain ID `31337`.
* O papel da **Secret Recovery Phrase** (12 palavras) na criptografia assimétrica, servindo de base para a geração e resgate seguro das chaves privadas.
* A finalidade do arquivo `hardhat.config.js` na definição da versão do Solidity (`0.8.20`) e das redes de testes.

### ❓ 6. Questões de Autoavaliação (Estilo Flashcard)
* **Pergunta 1: Qual a diferença entre a senha local definida no MetaMask e a Seed Phrase (Secret Recovery Phrase) de 12 palavras no que tange à recuperação da conta?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    A senha local protege os dados da extensão apenas no dispositivo atual em que ela foi criada, funcionando como uma fechadura de acesso local. A Seed Phrase de 12 palavras é a raiz criptográfica que gera todas as chaves privadas; com ela, qualquer indivíduo consegue recuperar a carteira e ter controle total dos ativos em qualquer outro computador, mesmo que a senha local seja perdida.
  </details>

* **Pergunta 2: Por que é necessário iniciar o Google Chrome através de linha de comando com o parâmetro `--remote-debugging-port=9222` para efetuar a depuração integrada com o VS Code?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Por padrão, os navegadores rodam de forma isolada por motivos de segurança. A flag `--remote-debugging-port=9222` instrui o Chrome a abrir uma porta de rede dedicada (9222) para que ferramentas externas (como o depurador do VS Code configurado no `launch.json`) possam se acoplar a ela, escutar eventos do console e depurar erros de JavaScript diretamente da IDE.
  </details>

* **Pergunta 3: Ao rodar o comando `npx hardhat node` no console, o que o Hardhat realiza em segundo plano e de onde vêm os saldos das carteiras exibidas?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    O comando inicializa um nó de blockchain local emulado (rede Ethereum de simulação) na porta local 8545. Ele cria na memória da máquina 20 contas com chaves privadas associadas e credita em cada uma delas um saldo fictício inicial de 10.000 ETH para permitir o desenvolvimento e testes de transações locais sem gastar fundos reais.
  </details>

* **Pergunta 4: O que é o Chain ID e qual o seu valor padrão para a rede de desenvolvimento local simulada pelo Hardhat?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    O Chain ID é um identificador numérico exclusivo associado a cada rede blockchain. Ele é utilizado criptograficamente para assinar transações, garantindo que as assinaturas sejam válidas apenas na rede especificada e prevenindo ataques de replicação em outras blockchains. O Chain ID padrão da rede local do Hardhat é `31337`.
  </details>

* **Pergunta 5: Explique como a MetaMask sabe que a conta importada possui 10.000 ETH se a rede é local e fictícia.**
  <details>
    <summary><b>Ver Resposta</b></summary>
    A MetaMask descobre o saldo consultando o nó de blockchain ao qual está conectada. Ao configurar a rede personalizada apontando para a URL local (`http://127.0.0.1:8545`), a MetaMask envia requisições RPC para o nó local do Hardhat. Como o Hardhat mantém em sua memória a conta importada (via chave privada correspondente) com o saldo inicial fictício de 10.000 ETH, ele responde a requisição e a MetaMask exibe o valor em sua interface.
  </details>
