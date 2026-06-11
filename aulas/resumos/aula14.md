**Disciplina:** Blockchain e Web 3.0
**Vídeo de Referência:** @[aulas/videos/Aula 14 - Introdução à Web 3.0 (Parte 8).mp4]

### 📌 1. Visão Geral e Objetivos
* **Contexto:** Esta aula conclui o ciclo prático introdutório da disciplina e avança para a integração de interfaces web com a blockchain usando a biblioteca `ethers.js`. O foco central é compreender a passagem de valores monetários a funções `payable`, a manipulação de metadados de transação via objeto `msg`, a emissão de logs através de eventos e a depuração de contratos localmente por meio de um explorador de blocos.
* **Objetivos de Aprendizagem:** O aluno deve compreender o papel e o preenchimento das propriedades `msg.sender` e `msg.value` pela EVM, saber codificar chamadas de funções `payable` enviando Ether convertido para Wei via frontend, declarar e emitir eventos em Solidity capturando-os no JavaScript, e instalar e configurar um explorador de blocos local conectado à Testnet do Hardhat.

### 🔑 2. Conceitos-Chave e Definições
* **Objeto `msg`**: Objeto global implícito injetado automaticamente pela Máquina Virtual do Ethereum (EVM) em todas as funções executadas, carregando metadados da transação em andamento.
* **`msg.value`**: Propriedade de leitura do objeto `msg` que informa a quantidade exata de Ether (expressa na unidade inteira Wei) enviada pelo remetente da transação junto à chamada da função.
* **`msg.sender`**: Propriedade de leitura do objeto `msg` que armazena o endereço da conta (carteira de usuário ou contrato) que assinou e efetuou a chamada atual da função.
* **Evento (`event`)**: Estrutura em Solidity que registra de forma permanente informações estruturadas em logs de transação armazenados nos blocos da rede, sem alterar variáveis globais do contrato.
* **Emissão de Evento (`emit`)**: Comando em Solidity responsável por disparar e consolidar os dados de um evento declarado nos logs históricos da blockchain durante o processamento de uma função.
* **`tx.wait()`**: Função assíncrona pertencente à biblioteca `ethers.js` que suspende temporariamente a linha de execução do frontend até que o bloco contendo a transação pendente seja minerado e confirmado pelos validadores.
* **Explorador de Blocos Local**: Aplicação visual instalada localmente (geralmente baseada em React) que exibe blocos, mempool, transações pendentes, opcodes da EVM e o consumo de gas associado a uma rede Hardhat local de testes.
* **Conversão Ether-Wei (`parseEther`)**: Operação matemática utilitária do frontend para converter representações decimais de moedas (ex: 2.5 Ether) em inteiros em escala Wei ($10^{18}$), formato obrigatório para processamento interno da rede.
* **Hash de Transação (*Transaction Hash*)**: Identificador hexadecimal único de 32 bytes gerado criptograficamente para rastrear, validar e referenciar cada transação enviada e registrada na blockchain.
* **Taxa de Protocolo / Intermediação (*Protocol Fee*)**: Fração financeira deduzida do valor principal transacionado em uma função que fica retida permanentemente no saldo do contrato intermediador como taxa de serviço, permitindo a monetização do protocolo Web3.

### 📝 3. Explicação Detalhada por Tópicos

* **Fechamento do Ciclo HelloWorld:**
  * O professor consolida as bases teóricas do primeiro contrato simples de escrita e leitura de dados:
    * Variáveis globais em Solidity residem no **storage**, a memória de estado mais duradoura e custosa de cada nó validador.
    * Todo contrato inteligente implantado possui um endereço próprio e comporta saldo de forma semelhante a uma carteira pessoal de usuário (EOA).
    * Modificadores `view` e `pure` indicam funções que apenas leem dados ou não acessam nenhuma memória, respectivamente, poupando a execução de transações on-chain complexas.

* **O Objeto `msg` Injetado pela EVM:**
  * A EVM injeta implicitamente o objeto global `msg` em todas as funções chamadas, sem necessidade de declaração de parâmetros locais.
  * O atributo `msg.sender` identifica de forma segura qual chave privada assinou e executou a chamada (essencial para controle de acesso).
  * O atributo `msg.value` carrega o valor exato de fundos enviados para a execução da lógica de negócios.

* **Integração de Escrita com Envio de Ether (`ethers.js`):**
  * O input do usuário em representação decimal (ex: 10 Ether) é convertido pelo JavaScript usando `ethers.utils.parseEther("10")` para gerar a representação inteira em Wei.
  * Para chamar funções `payable` enviando Ether, o frontend passa os argumentos regulares do método Solidity e adiciona ao final um objeto de configuração com a propriedade `value`:
    ```javascript
    // Código Javascript (Frontend)
    const tx = await contrato.transferEther(enderecoDestino, {
        value: ethers.utils.parseEther("10.0") // Envia 10 Ether em Wei
    });
    ```
  * O MetaMask intercepta o objeto de configuração, abre a tela de consentimento exibindo o valor de 10 Ether a ser retirado do saldo do remetente e a respectiva taxa de gas da rede.

* **Sincronismo de Rede e Mineração via `tx.wait()`:**
  * No frontend, a execução do comando `contrato.transferEther(...)` retorna imediatamente uma promessa com a transação pendente (`tx`), contendo apenas o seu hash identificador na mempool.
  * Chamar `await tx.wait()` trava o processamento do JavaScript até que a transação saia da fila e seja de fato selecionada por um nó, incluída em um bloco de dados e minerada.
  * Somente após a resolução dessa promessa é que se atualiza a interface para o status de "Transferência Concluída".

* **Auditoria de Logs com Eventos em Solidity:**
  * Manter registros históricos estruturados no storage do contrato inteligente é proibitivo pelo alto consumo de gas de rede.
  * A melhor prática é a declaração e disparo de **eventos** (`event`). Os eventos criam registros nos logs do bloco de forma econômica e podem ser monitorados e indexados por sistemas de indexação externos (como subgraphs ou webhooks).
  * Estruturação e disparo de evento no contrato:
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract EtherSender {
        // Declaração do evento
        event TransferExecuted(address indexed from, address indexed to, uint256 value);

        function transferEther(address payable to) external payable {
            require(to != address(0), "Destinatario invalido");
            require(msg.value > 0, "O valor precisa ser maior que zero");

            (bool success, ) = to.call{value: msg.value}("");
            require(success, "Falha na transferencia");

            // Emissão do evento
            emit TransferExecuted(msg.sender, to, msg.value);
        }
    }
    ```
    * O marcador `indexed` permite filtrar eventos na blockchain baseados nos endereços de origem (`from`) ou destino (`to`).
  * O frontend JavaScript pode acessar esses logs através do array retornado no recibo da transação (`receipt.events`).

* **O Explorador de Blocos Local:**
  * O professor apresenta o uso de um explorador local (como o Blockscout adaptado ou clone visual de Etherscan) para auditar execuções da rede de testes local (Hardhat).
  * **Passos para Instalar e Executar o Explorador:**
    1. Executar o clone do repositório do explorador no diretório local.
    2. Instalar todas as dependências locais utilizando o comando `npm install`.
    3. Copiar o arquivo `.env.example` para criar o arquivo `.env`.
    4. Atualizar o arquivo `.env` especificando o endpoint RPC da rede local do Hardhat (ex: `REACT_APP_RPC_URL=http://127.0.0.1:8545`).
    5. Rodar a aplicação utilizando `npm start`.

* **Lógica de Retenção de Taxas Operacionais (Evolução de Negócios):**
  * O professor introduz a teoria das taxas de protocolo (Stripe Model).
  * Em vez de simplesmente encaminhar 100% de `msg.value` para a conta de destino, o contrato aplicará uma fórmula matemática para deduzir uma taxa operacional (ex: 5%):
    $$\text{Taxa} = \frac{\text{msg.value} \times 5}{100}$$
    $$\text{Valor Líquido} = \text{msg.value} - \text{Taxa}$$
  * O contrato executa a transferência apenas do `Valor Líquido` para a carteira final, e o restante (os 5% de taxa cobrada) é retido de forma automática no balanço da carteira vinculada ao próprio contrato inteligente.

### 💡 4. Exemplos Práticos e Analogias
* **Analogia da Carta Registrada (O Objeto `msg`):** Imagine que você envia uma carta de remessa de valores a um banco contendo cédulas dentro do envelope. Você não precisa escrever uma nota interna informando qual é o seu nome e quanto colocou lá dentro para que o caixa saiba o remetente. O próprio envelope físico selado traz o remetente oficial carimbado no verso e o valor é aferido pelo peso e verificação de recebimento. Em Solidity, a EVM trata o objeto implícito `msg` exatamente como esse envelope carimbado: ele insere de forma inviolável quem assinou (`msg.sender`) e quanto dinheiro foi anexado à transação (`msg.value`).
* **Analogia da Senha do Painel (O `tx.wait()`):** Entregar uma transação à blockchain é como dar entrada em um requerimento no guichê de um cartório. O funcionário aceita os papéis, carimba e te entrega uma ficha de protocolo com um código de barras de rastreio (o hash da transação `tx`). Você não sai com o processo julgado nesse momento. Você precisa se sentar e aguardar que o painel luminoso chame a sua senha para retirar o documento finalizado (a promessa assíncrona do `tx.wait()`). Somente após o painel eletrônico confirmar o arquivamento (mineração) é que o trâmite está oficialmente ativo.
* **Analogia da Voz do Professor vs. Anotação na Lousa (Eventos vs. Storage):** Se o professor quisesse registrar a presença histórica de alunos durante 10 anos escrevendo o nome de cada um na lousa física da sala e deixando-os desenhados lá para sempre, a lousa ficaria sem espaço útil rapidamente, exigindo a compra de novas salas e paredes de concreto (alto custo de *storage* global). Em vez disso, o professor apenas diz em voz alta "Aluno X está presente" (emite o evento). Um fiscal do corredor anota isso em um livro de presença externa em papel (logs da transação). A lousa permanece livre para operações do dia a dia a um custo financeiro irrisório para a escola.

### 🎯 5. Resumo dos Pontos Críticos (O que vai cair na prova)
* **Preenchimento Automático do Objeto `msg`**: Reconhecer que propriedades como `msg.sender` (remetente) e `msg.value` (valor em Wei) são injetadas nativamente pela EVM a partir da assinatura criptográfica e do payload do remetente.
* **Configuração de Chamadas Payable no Ethers.js**: Saber que o Ether enviado para funções `payable` é especificado via frontend em um parâmetro extra do tipo objeto `{ value: valorEmWei }` passado no final da chamada de função.
* **Coordenação Assíncrona via `tx.wait()`**: Compreender que a confirmação no frontend de uma escrita depende do método `wait()` para suspender o JavaScript até a finalização da mineração no bloco da rede.
* **logs de Transações via Eventos**: Compreender a diferença econômica e arquitetural dos eventos (`event` e `emit`) em relação a arrays em storage global para fins de gravação de dados históricos.
* **Retenção de Saldos de Taxas no Contrato**: Entender que a retenção do excedente financeiro de uma transação dentro da carteira interna do contrato ocorre automaticamente ao não repassar 100% do valor de `msg.value` na chamada de transferência de baixo nível.

### ❓ 6. Questões de Autoavaliação (Estilo Flashcard)
* **Pergunta 1: Como informamos à biblioteca `ethers.js` que queremos enviar Ether de nossa carteira para uma função payable de um smart contract? Dê um exemplo prático da linha de chamada.**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Para enviar Ether em uma chamada, passamos um objeto JavaScript como último parâmetro da chamada da função no frontend contendo a propriedade `value` com a quantidade convertida para Wei. Exemplo: `await contrato.transferEther(destino, { value: ethers.utils.parseEther("5") });`
  </details>

* **Pergunta 2: O que representam as propriedades `msg.sender` e `msg.value` em Solidity e como elas ajudam na segurança e na lógica financeira dos contratos?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    `msg.sender` armazena o endereço público da conta que realizou e assinou criptograficamente a chamada, impedindo fraudes de identidade. `msg.value` armazena o valor exato em Wei enviado juntamente com a chamada de função payable, o que permite ao contrato auditar se a quantidade de Ether recebida satisfaz os requisitos financeiros necessários antes de prosseguir com a execução.
  </details>

* **Pergunta 3: Explique a diferença de custo e persistência entre emitir dados por meio de um `event` e salvá-los no array de um contrato inteligente.**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Emitir dados por eventos grava as informações diretamente na seção de logs das transações do bloco na blockchain. Esse método consome significativamente menos gas porque logs não fazem parte do estado global mutável do contrato e não precisam estar disponíveis para acesso direto em tempo de execução por outros smart contracts. Salvar dados no storage em arrays exige modificação de variáveis globais persistentes na memória de estado dos nós da blockchain, demandando muito mais poder computacional e tarifas elevadas de gas fee.
  </details>

* **Pergunta 4: O que faz o método `tx.wait()` no JavaScript do frontend e o que ocorreria se a interface do usuário tentasse exibir o saldo do contrato sem aguardar a conclusão dessa chamada?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    O `tx.wait()` bloqueia de forma assíncrona o fluxo de execução até que a transação correspondente saia da mempool (pool de transações pendentes), seja processada e minerada formalmente em um novo bloco. Se o frontend tentasse carregar e exibir o saldo do contrato antes de aguardar o término do `wait()`, a interface exibiria o saldo antigo desatualizado, pois a transação ainda estaria sendo propagada pela rede.
  </details>

* **Pergunta 5: Como um contrato inteligente consegue acumular fundos em sua carteira própria baseando-se no modelo de intermediação de pagamentos com taxa de serviço (Stripe Model)?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Quando o usuário invoca a função `payable` enviando fundos, todo o valor especificado em `msg.value` entra para a custódia temporária do endereço do contrato. A lógica do contrato realiza a dedução matemática de uma taxa (ex: 5% do valor recebido) e transfere apenas o valor restante (95%) para o destinatário final. Como o contrato executa o comando `.call{value: 95%}(...)`, a diferença (os 5% de taxa) não é repassada e permanece depositada permanentemente no balanço financeiro da própria carteira do contrato.
  </details>
