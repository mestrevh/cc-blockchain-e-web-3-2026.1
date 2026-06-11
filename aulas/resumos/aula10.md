**Disciplina:** Blockchain e Web 3.0
**Vídeo de Referência:** @[aulas/videos/Aula 10 - Introdução à Web 3.0 (Parte 4).mp4]

### 📌 1. Visão Geral e Objetivos
* **Contexto:** Esta aula é dedicada à compilação, implantação (deploy) e interação de contratos inteligentes no ambiente simulado do Hardhat. O foco principal é entender como o código em Solidity é convertido em bytecode executável pela EVM, como a aplicação frontend se conecta a um contrato implantado e a diferença técnica de custos entre transações de escrita e consultas gratuitas.
* **Objetivos de Aprendizagem:** O aluno deve compreender o processo de compilação em Solidity, entender os conceitos de Bytecode, Opcodes e versões de EVM (como a versão Paris), programar e executar scripts de deploy locais, associar o endereço do contrato no frontend e explicar a utilidade e gratuidade das funções puras (`pure`) de leitura na blockchain, bem como a arquitetura de armazenamento externo via IPFS.

### 🔑 2. Conceitos-Chave e Definições
* **Bytecode:** Código binário de baixo nível gerado após a compilação do contrato Solidity que pode ser diretamente interpretado e executado pela EVM.
* **Opcodes (Operation Codes):** Instruções elementares de máquina virtual baseadas na pilha da EVM (ex: `ADD` `0x01`, `MUL`, `SSTORE`) que executam ações computacionais fundamentais.
* **EVM Target / Versão da EVM:** A versão específica de regras e opcodes da máquina virtual para a qual o contrato é compilado (ex: a versão **Paris** correspondente ao The Merge do Ethereum, ou Cancun, Shanghai, etc.).
* **Deploy (Implantação):** O processo de enviar o bytecode de um contrato inteligente para a rede blockchain através de uma transação, criando um endereço de contrato único e persistente.
* **Contract Address (Endereço do Contrato):** Identificador alfanumérico exclusivo na blockchain que localiza o contrato inteligente implantado e serve como destino para chamadas e transações.
* **`pure` Keyword:** Modificador de mutabilidade de estado em Solidity que declara que a função não lê e nem modifica o estado da blockchain, tornando sua execução off-chain inteiramente gratuita.
* **`eth_call`:** Requisição RPC de leitura imediata enviada a um nó da blockchain que executa o código de uma função localmente sem criar uma transação no livro-razão e sem custo de gas.
* **Base64 / Armazenamento de Arquivos em Blockchain:** Representação binária em string que permite embutir arquivos no código, mas cujo armazenamento direto em contratos inteligentes é desencorajado devido ao elevado custo computacional.
* **IPFS (InterPlanetary File System):** Protocolo descentralizado de rede ponto a ponto (P2P) projetado para armazenar e compartilhar arquivos de forma distribuída, gerando um hash único de conteúdo imutável.
* **EIP (Ethereum Improvement Proposal):** Documentos formais de propostas de melhoria técnicas e padrões adotados pela comunidade Ethereum para evoluir a máquina virtual e as regras da rede.

### 📝 3. Explicação Detalhada por Tópicos

* **Compilação e a Anatomia Interna da EVM:**
  * O professor demonstra a compilação do contrato inteligente utilizando o comando `npm run compile` (mapeado para `hardhat compile`).
  * Ele esclarece que a EVM (Ethereum Virtual Machine) funciona baseada em uma arquitetura de pilha e executa instruções chamadas **Opcodes** (códigos de operação).
  * Cada instrução de alto nível em Solidity (como uma soma) é convertida pelo compilador em uma série de Opcodes (ex: `ADD` correspondente ao byte `0x01`).
  * As versões da EVM utilizam codinomes de cidades (Paris, Shanghai, Cancun, Prague). A versão adotada na aula é a **Paris** (de setembro de 2022, data do "The Merge"). Cada atualização de versão introduz novos opcodes e regras de consenso.
  
* **Declaração do Contrato "Hello World" em Solidity:**
  * A estrutura básica de um contrato simulando uma classe é definida com a palavra-chave `contract`:
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity 0.8.20;

    contract HelloWorld {
        function getMessage() public pure returns (string memory) {
            return unicode"hello from blockchain 🚀";
        }
    }
    ```
  * **Uso do modificador `unicode`:** O professor destaca que para strings que contêm caracteres especiais ou emojis (como o foguete `🚀`), é obrigatório prefixar o literal com a palavra-chave `unicode` para evitar falhas de compilação causadas por codificação não-ASCII.

* **Fluxo de Deploy e Estrutura do Script de Implantação:**
  * Para publicar o contrato na rede local, utiliza-se um script JS localizado em `scripts/deploy.js` que é invocado pelo comando `npm run deploy:local` (mapeado para `hardhat run scripts/deploy.js --network localhost`).
  * O deploy consiste em empacotar o bytecode do contrato em uma transação assinada e enviá-la para a rede local (`http://127.0.0.1:8545`).
  * Como o deploy altera o estado global da rede (adicionando um novo contrato), ele é classificado como uma transação que consome saldo da carteira do implantador para pagar a taxa de gas. Ao final da execução, o terminal do Hardhat exibe as chamadas RPC efetuadas e retorna o **Contract Address** gerado.

* **Conexão Frontend e Invocação RPC:**
  * Após obter o endereço correto do contrato, o desenvolvedor atualiza a variável `contractAddress` no script do frontend.
  * Com a MetaMask conectada na rede local do Hardhat (`Chain ID 31337`), o usuário clica em **Get Message**.
  * A aplicação frontend realiza uma requisição de leitura disparando o método `eth_call` na blockchain.
  * O terminal do Hardhat registra a requisição:
    - **Origem:** Endereço da carteira importada (Account #0 - final `92266`).
    - **Destino:** Endereço do contrato HelloWorld (final `80a3`).
    - **Função invocada:** `getMessage()`.
  * O texto de retorno `"hello from blockchain 🚀"` é impresso na interface da página.

* **O Modificador `pure` e a Gratuidade de Leitura:**
  * O modificador **`pure`** sinaliza à EVM que a função não acessa variáveis globais de estado e nem grava informações na blockchain.
  * Como a chamada é estritamente computacional e não modifica o estado compartilhado da blockchain, ela é processada inteiramente localmente pelo nó que recebe a requisição. Portanto, **não há geração de transação minerada** e **o custo de gas é zero** (gratuito) para o usuário quando chamada off-chain.

* **Arquitetura de Armazenamento de Grande Volume e IPFS:**
  * Respondendo a questionamentos dos alunos, o professor explica que colocar grandes volumes de dados (como imagens raw ou sequências longas em Base64) diretamente em variáveis de contratos inteligentes na blockchain é inviável e extremamente caro, pois todos os validadores da rede precisariam replicar e armazenar esses bytes.
  * A solução arquitetural padrão na Web3 (como a usada em NFTs) consiste em hospedar os arquivos pesados de forma descentralizada no **IPFS (InterPlanetary File System)**.
  * O IPFS armazena o arquivo em uma rede P2P distribuída e gera uma referência criptográfica estável (hash). O contrato inteligente armazena na blockchain apenas essa referência/endereço curto, mantendo o custo de gas mínimo e preservando a descentralização.

### 💡 4. Exemplos Práticos e Analogias
* **Analogia da VM do Solidity e a JVM:** A EVM funciona de modo muito similar à JVM (Java Virtual Machine) ou ao interpretador de Python. Você escreve código em alto nível (Java ou Solidity), o compilador traduz isso para um formato intermediário estruturado em opcodes de pilha (Bytecode), e a máquina virtual interpreta esses opcodes executando no processador.
* **Analogia do IPFS e o Guarda-Volumes do Aeroporto:** Armazenar uma imagem na blockchain é como tentar viajar carregando um armário de madeira gigante nas mãos. Você pagará excesso de bagagem caríssimo a cada embarque. O padrão IPFS funciona como deixar o armário em um guarda-volumes do aeroporto (rede IPFS) e viajar carregando apenas o bilhete impresso de retirada (hash/endereço). O bilhete é leve e barato de guardar na sua carteira (blockchain), mas dá acesso garantido ao armário.
* **O Custo Zero do Modificador `pure`:** Consultar uma função `pure` na blockchain é como ler uma página de um livro na biblioteca pública. Você consome energia física (processamento local no nó) mas não altera o conteúdo do livro, sendo totalmente de graça. Gravar dados (funções que mudam o estado) equivale a escrever uma página nova no livro oficial de registros da cidade; exige taxas cartoriais (gas) e o carimbo de múltiplos tabeliães (consenso).

### 🎯 5. Resumo dos Pontos Críticos (O que vai cair na prova)
* O processo de compilação em blockchain, conceituando **Bytecode**, **Opcodes** (comandos elementares) e a lógica de execução sob pilha da EVM.
* As versões de EVM e a importância histórica da versão **Paris**, que introduziu mudanças chaves no algoritmo de consenso e novos opcodes.
* O fluxo operacional de deploy de contratos, sendo reconhecido como uma transação que demanda pagamento de taxas de gas e gera um **Contract Address**.
* A definição e a vantagem econômica do modificador **`pure`**: ausência de interação com estado de armazenamento e gratuidade em chamadas off-chain via `eth_call`.
* O padrão arquitetural de armazenamento híbrido da Web3: dados estruturados leves e apontadores na blockchain, e arquivos pesados no **IPFS**.

### ❓ 6. Questões de Autoavaliação (Estilo Flashcard)
* **Pergunta 1: Por que é necessário utilizar o modificador `unicode` antes de uma string literal com emojis em Solidity (ex: `unicode"hello 🚀"`) e o que ocorre se ele for omitido?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    O Solidity por padrão interpreta strings literais simples utilizando codificação estritamente ASCII. Caracteres fora da tabela ASCII tradicional (como emojis e acentos complexos de caracteres Unicode) contêm sequências de múltiplos bytes que o compilador não reconhece de forma nativa nessa codificação. Se o modificador `unicode` for omitido, o compilador Solidity falhará na análise sintática e emitirá um erro de compilação de caractere inválido.
  </details>

* **Pergunta 2: O que são Opcodes no contexto da EVM e como uma operação simples de adição escrita em Solidity é convertida para ser rodada pela rede?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Opcodes são os códigos binários de instrução de operação em baixo nível interpretados pela EVM (que opera baseada em pilhas). Quando uma linha de código Solidity (como `1 + 1`) é compilada, o compilador converte os operadores matemáticos no opcode correspondente (como o opcode `ADD` de valor hexadecimal `0x01`), empilhando os argumentos e executando a soma a nível de máquina virtual.
  </details>

* **Pergunta 3: Qual a diferença técnica entre realizar uma requisição de leitura `eth_call` em uma função `pure` e uma transação de escrita (deploy ou alteração de estado) em relação ao consenso da rede e taxas de gas?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Uma requisição `eth_call` de leitura a uma função `pure` é processada localmente e de forma isolada pelo nó RPC que recebeu a chamada, sem necessidade de consenso de rede global ou registro no bloco, o que a torna instantânea e totalmente gratuita (sem gas). Já uma transação de escrita modifica o estado global da blockchain, exigindo que a instrução seja propagada para toda a rede, validada via algoritmo de consenso e persistida por todos os nós em um novo bloco, o que demanda tempo e o pagamento obrigatório de taxas de gas para remunerar os validadores pelo processamento.
  </details>

* **Pergunta 4: Explique por que não se deve armazenar grandes volumes de dados (como imagens e mídias brutas) diretamente nos contratos inteligentes da blockchain e descreva a solução descentralizada padrão adotada para contornar isso.**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Armazenar grandes volumes de dados diretamente na blockchain é extremamente caro e ineficiente, pois cada nó validador na rede é forçado a baixar, processar e guardar perpetuamente esses dados em seus discos rígidos locais, gerando taxas de gas inviáveis para a transação. A solução padrão é salvar a mídia em um sistema descentralizado P2P como o IPFS (InterPlanetary File System), obter o link/hash curto de conteúdo e armazenar apenas esse apontador leve no contrato inteligente, mantendo a transação barata sem abrir mão da imutabilidade e distribuição.
  </details>

* **Pergunta 5: O que representa a versão "Paris" da EVM exibida durante a compilação de contratos inteligentes e qual seu significado histórico para o Ethereum?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    A versão "Paris" representa a especificação e o conjunto de regras computacionais (incluindo novos opcodes e comportamento da EVM) introduzidos na atualização histórica do Ethereum conhecida como "The Merge", em setembro de 2022. Essa atualização marcou a transição da rede Ethereum do algoritmo de consenso Proof of Work (Mineração física) para o Proof of Stake (Validação por participação), unificando a camada de execução e alterando profundamente o funcionamento e segurança da rede.
  </details>
