**Disciplina:** Blockchain e Web 3.0
**Vídeo de Referência:** @[aulas/videos/Aula 11 - Introdução à Web 3.0 (Parte 5).mp4]

### 📌 1. Visão Geral e Objetivos
* **Contexto:** Esta aula aprofunda a integração prática entre contratos inteligentes e aplicações frontend. O foco principal é compreender as diferenças entre modificadores de visibilidade e estado (`pure` e `view`), analisar a estrutura e utilidade da ABI (Application Binary Interface) gerada na compilação, e entender como a aplicação web se reconecta programaticamente a novas instâncias de contratos locais do Hardhat após a reinicialização da rede.
* **Objetivos de Aprendizagem:** O aluno deve compreender e diferenciar conceitualmente e na prática as funções puras (`pure`) e funções de visualização (`view`), interpretar a estrutura interna de um arquivo de artefato de compilação JSON contendo a ABI e o Bytecode, integrar a ABI atualizada no frontend via JavaScript e entender os fluxos de atualização manual versus dinâmica em projetos Web3 profissionais.

### 🔑 2. Conceitos-Chave e Definições
* **Variáveis de Estado (Storage Variables):** Variáveis declaradas no escopo global do contrato inteligente cujos valores são gravados e mantidos permanentemente no livro-razão (armazenamento persistente) da blockchain.
* **`view` Keyword:** Modificador de mutabilidade em Solidity usado para sinalizar que a função realiza leitura de variáveis de estado do contrato, mas não modifica o estado da blockchain, sendo gratuita quando executada off-chain.
* **`pure` Keyword:** Modificador de mutabilidade em Solidity usado para sinalizar que a função não lê dados de estado e nem escreve na blockchain, operando apenas com dados fornecidos no próprio escopo ou parâmetros.
* **ABI (Application Binary Interface):** Estrutura padronizada em formato JSON que descreve os métodos, parâmetros de entrada, tipos de retorno e estados de mutabilidade de um contrato inteligente, permitindo que o frontend interaja com o bytecode do contrato.
* **`ethers.Contract`:** Classe provida pela biblioteca `ethers.js` que instancia um objeto JavaScript representando o contrato inteligente a partir do seu endereço de deploy, sua ABI e o assinante (carteira do usuário).
* **Bytecode de Contrato:** Código binário executável implantado de forma definitiva em um endereço da blockchain, traduzido de Solidity para opcodes reconhecidos pela EVM.
* **`nonpayable`:** Estado padrão de mutabilidade de funções que podem alterar o estado das variáveis da blockchain, mas que não recebem ou transferem Ether nativo durante sua chamada.
* **Hardcode (Codificação Estática):** Prática de inserir dados ou configurações diretamente no código-fonte do programa de forma fixa, dificultando a manutenção automática.
* **Carregamento Dinâmico de ABI:** Técnica profissional em que a aplicação frontend consome a ABI lendo diretamente um arquivo `.json` exportado da compilação do contrato, evitando a necessidade de copiar e colar código manualmente.

### 📝 3. Explicação Detalhada por Tópicos

* **Persistência de Rede e Atualização de Endereços de Deploy:**
  * O professor demonstra que, ao reiniciar a blockchain local do Hardhat (`npm run chain`), todos os dados anteriores são limpos e o contrato precisa ser implantado novamente (`npm run deploy:local`).
  * Cada nova implantação gera um **Contract Address** diferente. O desenvolvedor deve atualizar manualmente a variável `contractAddress` no arquivo [app.js](file:///Ubuntu/home/victorhugo/cc-blockchain-e-web-3-2026.1/aulas/pratica/aula-1/frontend/app.js) para que a aplicação web se reconecte corretamente.

* **Mutabilidade do Estado: `pure` vs `view` em Solidity:**
  * O contrato `HelloWorld` é estendido com variáveis e novas funções:
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity 0.8.20;

    contract HelloWorld {
        uint256 public storedData;

        // Modifica o estado do contrato (gasta gas se chamado por outra transação on-chain)
        function set(uint256 x) public {
            storedData = x;
        }

        // Apenas lê variáveis de estado (view) - gratuito off-chain
        function get() public view returns (uint256) {
            return storedData;
        }

        // Não lê nem modifica o estado (pure) - gratuito off-chain
        function getMessage() public pure returns (string memory) {
            return unicode"hello from blockchain 🚀";
        }
    }
    ```
  * **Funções `pure`:** Utilizadas quando o retorno não depende de nenhuma variável fora da própria função (ex: retornar um valor estático ou realizar cálculos matemáticos puramente com parâmetros de entrada).
  * **Funções `view`:** Utilizadas quando a função lê uma variável persistente global do contrato (como `storedData`), mas garante que não a modificará.
  * **Custo computacional:** Nenhuma das duas funções consome gas (taxas de transação) quando chamadas de fora da blockchain (por um frontend local via `eth_call`). O compilador informa essa mutabilidade à EVM para otimizar a velocidade de processamento do nó local.

* **Anatomia da ABI (Application Binary Interface):**
  * Toda compilação gera um arquivo de artefato JSON (ex: `HelloWorld.json`). Ele contém a **ABI**, que descreve os métodos para a aplicação frontend.
  * O professor analisa os elementos estruturais da ABI no JSON:
    * **`get`**: Nome da função é `get`, parâmetros de entrada (`inputs`) é um array vazio `[]`, parâmetros de saída (`outputs`) contém um tipo `uint256`, e a mutabilidade é classificada como `view`.
    * **`set`**: Nome da função é `set`, inputs contém o parâmetro `x` do tipo `uint256`, outputs é um array vazio `[]`, e a mutabilidade de estado é sinalizada como **`nonpayable`** (altera o estado, mas não realiza transações financeiras de Ether).
    * **`getMessage`**: Tipo `function`, inputs vazio `[]`, outputs do tipo `string`, e mutabilidade classificada como `pure`.

* **Integração Frontend com a Classe `ethers.Contract`:**
  * A biblioteca `ethers.js` é usada para criar uma ponte no frontend JavaScript:
    ```javascript
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    ```
  * Para invocar o contrato, o JavaScript apenas executa a chamada na instância: `const message = await contract.getMessage();`
  * O `ethers.js` consulta a ABI para codificar a chamada no formato exigido pela EVM e despacha a requisição HTTP JSON-RPC ao nó do Hardhat.
  * O professor demonstra no console do Hardhat o log gerado ao clicar no botão: `eth_call` apontando da carteira do usuário para o endereço do contrato e chamando a função `getMessage()`.
  * O resultado retornado é atribuído ao HTML do DOM usando propriedades como `innerText` no elemento com ID `message`.

* **Sincronização de ABI: Fluxo Manual vs Profissional:**
  * **Fluxo Didático (Manual):** O desenvolvedor compila o contrato, abre o arquivo `.json` gerado na pasta `artifacts`, copia o array correspondente ao campo `abi` e cola diretamente na declaração de variável no frontend (`app.js`).
  * **Fluxo Profissional (Dinâmico):** Em projetos reais, o código do contrato inteligente e o do frontend residem em repositórios separados. A equipe de contratos fornece o arquivo `.json` compilado para o time de frontend. O código da aplicação frontend é programado para fazer um carregamento dinâmico do JSON (via chamadas `fetch` ou instruções `require`), eliminando a necessidade de reescrever ou copiar código em variáveis estáticas todas as vezes que o contrato mudar.

### 💡 4. Exemplos Práticos e Analogias
* **Analogia da ABI e o Manual do Eletrodoméstico:** A ABI é como o manual de instruções ou a disposição dos botões físicos de um eletrodoméstico (por exemplo, um micro-ondas). A aplicação frontend é o usuário que quer usar o micro-ondas. Ela não precisa entender os circuitos integrados internos e nem as placas eletrônicas (o Bytecode), mas precisa do painel de botões e do manual (a ABI) que diz exatamente qual botão apertar (nome do método) e o que colocar no prato (parâmetros de entrada) para obter o alimento aquecido (retorno).
* **Analogia de `pure` vs `view` e a Lousa da Sala:** Imagine a blockchain como a lousa de uma sala de aula. 
  * Uma função **`view`** é como um aluno que olha para a lousa e lê em voz alta o que o professor escreveu (lê a variável de estado `storedData`).
  * Uma função **`pure`** é como um aluno que realiza uma conta matemática em sua própria cabeça, sem sequer olhar para a lousa (não lê e nem escreve na blockchain). 
  * Ambas as ações não alteram o que está escrito no quadro e, portanto, não gastam "giz" (gas).

### 🎯 5. Resumo dos Pontos Críticos (O que vai cair na prova)
* A diferença fundamental entre os modificadores de mutabilidade: **`pure`** (não acessa o estado e nem o lê) e **`view`** (acessa e lê o estado global, mas não o altera).
* A gratuidade de gas das funções `pure` e `view` quando invocadas por um cliente externo (fora de uma transação on-chain) por meio do comando `eth_call`.
* O papel da **ABI (Application Binary Interface)** como o mapeador estrutural necessário para traduzir requisições JavaScript em chamadas binárias de opcodes da EVM.
* A estrutura da classe `ethers.Contract` no frontend, exigindo os três parâmetros obrigatórios: endereço do contrato, ABI e assinante/provedor (`signer`).
* O conceito do estado mutável **`nonpayable`** na ABI, representando funções que alteram variáveis de estado, mas não aceitam ou operam moedas nativas (Ether).

### ❓ 6. Questões de Autoavaliação (Estilo Flashcard)
* **Pergunta 1: Se o desenvolvedor modificar uma função em seu contrato inteligente adicionando uma nova leitura de variável global, o que ele precisa fazer no frontend da aplicação para que essa mudança seja refletida com sucesso?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Ele deve compilar o contrato inteligente novamente para atualizar a ABI. Em seguida, deve atualizar a cópia da ABI no frontend (copiando o novo JSON da pasta `artifacts` ou recarregando o arquivo JSON dinamicamente), pois sem a nova definição da interface na ABI, o objeto `ethers.Contract` no frontend não reconhecerá a alteração da assinatura do método e a chamada falhará.
  </details>

* **Pergunta 2: Por que uma função Solidity declarada com o modificador `view` não pode ser marcada com o modificador `pure`?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Porque o modificador `view` é utilizado especificamente quando a função necessita ler uma variável de estado persistente do contrato (como o valor de `storedData`). O modificador `pure` é muito mais restritivo e proíbe terminantemente tanto a alteração quanto qualquer leitura do estado da blockchain, permitindo apenas operações com variáveis locais à função ou parâmetros de entrada.
  </details>

* **Pergunta 3: Qual a diferença de finalidade entre o Bytecode e a ABI contidos no arquivo JSON gerado na compilação do contrato inteligentes?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    O Bytecode é a representação em baixo nível do contrato em formato hexadecimal que será de fato enviado e gravado na blockchain para execução direta da EVM. A ABI é uma interface estruturada em JSON que descreve os métodos, parâmetros e tipos de dados do contrato, servindo como um "mapa" para que linguagens externas (como o JavaScript no frontend) saibam como formatar chamadas e interagir com o Bytecode gravado.
  </details>

* **Pergunta 4: O que significa a propriedade `stateMutability` na descrição de uma função na ABI e quais valores ela pode assumir?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    A propriedade `stateMutability` especifica o nível de interação da função com o estado da blockchain. Ela indica à EVM o comportamento de leitura/escrita e pode assumir quatro valores principais: `pure` (sem ler nem alterar estado), `view` (apenas leitura do estado), `nonpayable` (pode alterar o estado, mas não recebe Ether) e `payable` (pode alterar o estado e aceita receber Ether nativo na transação).
  </details>

* **Pergunta 5: Como a biblioteca `ethers.js` sabe o que enviar ao nó da blockchain quando chamamos `contract.getMessage()` no JavaScript?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    A biblioteca `ethers.js` consulta o array da ABI do contrato para encontrar a função `getMessage`. Ela verifica o nome, os parâmetros (que nesse caso estão vazios) e o retorno. Com base nisso, ela gera uma chamada padronizada contendo a assinatura criptografada da função (seletor de função) e codifica o payload, empacotando-o em uma requisição HTTP JSON-RPC com o método `eth_call` que é enviada ao nó local da blockchain.
  </details>
