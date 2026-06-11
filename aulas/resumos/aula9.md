**Disciplina:** Blockchain e Web 3.0
**Vídeo de Referência:** @[aulas/videos/Aula 9 - Introdução à Web 3.0 (Parte 3).mp4]

### 📌 1. Visão Geral e Objetivos
* **Contexto:** Esta aula aborda a integração programática entre uma aplicação frontend e a carteira digital MetaMask utilizando a API do provedor Ethereum (`window.ethereum`). O foco central é automatizar o fluxo de conexão do usuário, a detecção de redes e a troca automática para uma blockchain local de desenvolvimento (Hardhat), garantindo a persistência das configurações do perfil do navegador.
* **Objetivos de Aprendizagem:** O aluno deve ser capaz de configurar o perfil de desenvolvimento do Chrome para manter a persistência de dados, utilizar a API de provedor `window.ethereum` para interagir com a MetaMask por código JavaScript, implementar o chaveamento automático de redes usando `wallet_switchEthereumChain` e `wallet_addEthereumChain` com formatação hexadecimal para o Chain ID, e compreender a arquitetura geral de chamadas de métodos a contratos inteligentes.

### 🔑 2. Conceitos-Chave e Definições
* **`window.ethereum` (Provedor Ethereum):** Objeto injetado no escopo global do navegador por carteiras digitais (como a MetaMask) que atua como API/ponte para que o frontend envie requisições RPC à blockchain e interaja com a carteira.
* **`wallet_switchEthereumChain`:** Método RPC do provedor Ethereum utilizado para solicitar à carteira do usuário a troca ativa para uma rede blockchain específica, identificada por seu Chain ID em formato hexadecimal.
* **`wallet_addEthereumChain`:** Método RPC utilizado para registrar e configurar uma nova blockchain na carteira do usuário (informando RPC URL, Chain ID, símbolo da moeda e nome da rede) caso ela ainda não esteja cadastrada.
* **Hexadecimal no Chain ID:** Formato numérico em base 16 exigido pelas requisições RPC do padrão Ethereum para o identificador da rede (ex: o identificador decimal `31337` é passado como `0x7a69`).
* **Query Parameter (Query String):** Parâmetros de busca anexados ao final de uma URL (iniciando com `?` e separados por `&`) usados para passar dados de controle ao frontend (ex: `?showHardNetwork=1`).
* **Browser-Sync:** Ferramenta de desenvolvimento que cria um servidor local para arquivos estáticos (HTML/CSS/JS) e realiza o recarregamento automático (live reload) do navegador sempre que um arquivo do projeto é alterado.
* **`hidden` Attribute:** Atributo nativo do HTML usado para esconder elementos da interface gráfica. A manipulação de sua presença via JavaScript permite alternar dinamicamente a visibilidade de componentes.
* **ABI (Application Binary Interface):** Arquivo JSON gerado na compilação de um contrato inteligente que descreve todas as suas funções, parâmetros e retornos, servindo de mapa para o frontend saber como invocar as funções do contrato.

### 📝 3. Explicação Detalhada por Tópicos

* **Correção e Persistência do Perfil de Desenvolvimento do Chrome:**
  * O professor inicia revisando o script de depuração remota do Chrome (`--remote-debugging-port=9222`).
  * Ele aponta que apontar o `--user-data-dir` para a pasta temporária (`/tmp` ou similar) faz com que o sistema operacional limpe as chaves e dados da MetaMask entre os reinícios do computador.
  * A correção sugerida é remapear a pasta do perfil de usuário para uma pasta fixa dentro do próprio diretório do projeto (como uma pasta local não-temporária), assegurando a persistência das carteiras importadas e configurações de rede de uma aula para outra.
  
* **Interface e Manipulação Dinâmica de Elementos HTML via Query Parameters:**
  * A aplicação frontend possui uma seção oculta marcada com o ID `session site network` e o atributo `hidden`.
  * Em `app.js` (no escopo do frontend), o código inspeciona os parâmetros da URL (`window.location.search`).
  * Se o parâmetro `showHardNetwork=1` for detectado na URL, o JavaScript remove dinamicamente o atributo `hidden` da seção, expondo os controles adicionais de rede local na tela. O professor reforça que a manipulação de DOM em HTML/JavaScript é um pré-requisito e não o foco principal da disciplina.
  
* **Conexão e Requisições para Provedores Ethereum via API (`window.ethereum`):**
  * O frontend se comunica com a MetaMask utilizando o objeto global `window.ethereum`.
  * Toda ação (conectar carteira, trocar rede, assinar transação) é disparada via `ethereum.request({ method: '...' })`.
  * Ao clicar no botão **Connect Wallet**, a aplicação dispara uma solicitação para conectar as contas e ler o endereço público do usuário (`eth_requestAccounts`) e o identificador da rede (`eth_chainId`).
  
* **Chaveamento e Cadastro Automático de Redes no MetaMask via Programação:**
  * Em vez de exigir que o usuário adicione a rede local manualmente nas configurações da MetaMask, a aplicação automatiza o fluxo:
    1. Tenta trocar para a rede local do Hardhat chamando o método `wallet_switchEthereumChain` com o Chain ID em hexadecimal (`0x7a69`).
    2. Se a rede não estiver cadastrada na MetaMask (gerando um erro com o código `4902`), o bloco `catch` intercepta o erro e chama o método `wallet_addEthereumChain`.
    3. Esse método exibe um modal amigável na MetaMask solicitando que o usuário aprove o cadastro da nova rede local com as seguintes configurações passadas no objeto:
       - **Chain ID:** `0x7a69` (decimal `31337`)
       - **Network Name:** local host web3 (ou similar)
       - **RPC URL:** `http://127.0.0.1:8545`
       - **Native Currency:** Nome `Ether`, Símbolo `ETH`, Decimais `18`
    4. O usuário confirma a aprovação e a MetaMask chaveia a rede ativa automaticamente.
  
* **Visão Geral sobre Chamadas de Funções a Contratos Inteligentes:**
  * O professor antecipa o funcionamento da aplicação completa "Hello World".
  * Um contrato inteligente simples compilado e implantado na rede local possui a função `getMessage()` que retorna a string `"hello from blockchain"`.
  * No frontend, a execução de `contract.getMessage()` executa uma chamada de leitura rápida na blockchain e exibe o retorno da string na tela ao clicar no botão **Get Message**.
  * É destacado que, na próxima aula, será detalhada a lógica profunda de como essa chamada trafega via requisições JSON-RPC, codificação ABI e rede sob o capô, indo além de simples cliques em botões.

### 💡 4. Exemplos Práticos e Analogias
* **Analogia da Conversão Decimal para Hexadecimal (`31337` $\rightarrow$ `0x7a69`):** É equivalente a enviar uma carta internacional. Embora você entenda o número do seu CEP de forma decimal, a central postal exige um formato padronizado internacional em código de barras para triagem eletrônica rápida. Para a MetaMask, o Chain ID numérico deve ser empacotado em notação hexadecimal.
* **O Erro do Perfil Temporário (TMP):** Salvar as configurações da MetaMask na pasta `/tmp` é como construir uma barraca de acampamento em uma praia de maré alta. Funciona perfeitamente durante a tarde (enquanto você desenvolve), mas na manhã seguinte (ao reiniciar a máquina), a maré sobe (o sistema operacional roda scripts de limpeza) e arrasta toda a sua estrutura embora.
* **O Fluxo de wallet_switch e wallet_add:** Imagine tentar sintonizar uma rádio local no carro. O `wallet_switch` é o botão de memória do rádio. Se a estação local do Hardhat já estiver programada, ela sintoniza na hora. Caso contrário, o rádio busca a frequência e exibe uma mensagem na tela perguntando se você quer salvar a nova estação (`wallet_add`) para poder ouvi-la.

### 🎯 5. Resumo dos Pontos Críticos (O que vai cair na prova)
* A utilização do objeto `window.ethereum` como o provedor e canal principal de dados entre aplicações Web 3.0 e a blockchain.
* A formatação obrigatória em **hexadecimal** para parâmetros de Chain ID em chamadas RPC da MetaMask (ex: `0x7a69` para o Chain ID local do Hardhat `31337`).
* O fluxo condicional de chaveamento de rede: a tentativa inicial via `wallet_switchEthereumChain` seguida de `wallet_addEthereumChain` em caso de falha por ausência da rede.
* O impacto do remapeamento do `--user-data-dir` do Chrome para garantir a retenção estável de dados e evitar o reset constante das chaves privadas da carteira MetaMask.
* A estrutura de uma chamada a um contrato inteligente no frontend (`contract.functionName()`) e sua dependência do mapeamento de funções.

### ❓ 6. Questões de Autoavaliação (Estilo Flashcard)
* **Pergunta 1: Por que a MetaMask exige que o Chain ID nas chamadas de troca ou adição de rede via programação seja especificado em hexadecimal (como `0x7a69`) ao invés do decimal tradicional `31337`?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Porque a API de comunicação interna das redes baseadas em Ethereum (especificação EIP-1474 e EIP-3085) adota a codificação JSON-RPC padrão, a qual exige que valores numéricos como Chain IDs e quantidades de gas sejam enviados codificados como strings em representação hexadecimal prefixadas por `0x` para padronização e eficiência de parsing no protocolo de rede.
  </details>

* **Pergunta 2: Descreva a sequência lógica de tratamento de erro que permite que um site cadastre e mude a rede do usuário para o nó do Hardhat sem que ele faça isso manualmente no menu da carteira.**
  <details>
    <summary><b>Ver Resposta</b></summary>
    O código Javascript do frontend executa um bloco `try-catch` chamando `wallet_switchEthereumChain` com o Chain ID `0x7a69`. Se a rede local não estiver cadastrada na MetaMask do usuário, a chamada falha e lança um erro com um código de status específico (tipicamente o código `4902`). O bloco `catch` intercepta esse erro de "rede não encontrada" e executa a chamada ao método `wallet_addEthereumChain` passando as informações de configuração da rede (URL RPC e metadados) para que a MetaMask exiba o modal de adição de rede ao usuário.
  </details>

* **Pergunta 3: Qual a função do parâmetro `--remote-debugging-port` e como ele atua em conjunto com o VS Code para melhorar a produtividade do desenvolvedor?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Este parâmetro expõe uma porta de comunicação em rede na instância aberta do Google Chrome. O VS Code conecta-se a essa porta através de um perfil de "anexação" (attach) no arquivo `launch.json`. Uma vez conectado, ele cria um canal bidirecional onde erros do console da web, mensagens e logs do navegador são replicados em tempo real diretamente dentro do painel Debug Console do próprio editor de código, eliminando a necessidade de ficar alternando entre o código e as ferramentas de desenvolvedor do navegador.
  </details>

* **Pergunta 4: O que é e qual o papel do objeto `window.ethereum` no desenvolvimento de aplicações frontend da Web 3.0?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    O `window.ethereum` é o objeto do provedor de API que a extensão da MetaMask injeta dinamicamente na página web. Ele atua como o intermediário principal entre o código JavaScript do frontend e a rede blockchain, permitindo que a aplicação faça requisições RPC para ler contas, assinar transações, escutar eventos de mudança de carteira ou rede, e interagir com contratos inteligentes.
  </details>

* **Pergunta 5: Por que o uso de diretórios temporários (como `/tmp`) no parâmetro `--user-data-dir` do Chrome é desencorajado para desenvolvimento recorrente e como isso afeta a MetaMask?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Porque o diretório temporário é apagado rotineiramente pelo sistema operacional. Quando isso ocorre, todo o perfil de configurações do Chrome associado é limpo, resultando na perda das informações instaladas na extensão da MetaMask (incluindo as chaves privadas importadas das contas locais do Hardhat, redes customizadas adicionadas e a Seed Phrase da carteira), exigindo que o desenvolvedor refaça todo o setup do zero a cada reinício.
  </details>
