**Disciplina:** Blockchain e Web 3.0
**Vídeo de Referência:** @[aulas/videos/Aula 12 - Introdução à Web 3.0 (Parte 6).mp4]

### 📌 1. Visão Geral e Objetivos
* **Contexto:** Esta aula aborda a manipulação prática de variáveis de estado na blockchain por meio de interações frontend com o contrato inteligente. São explicados os fluxos de desenvolvimento de escrita de dados, validação de entradas do usuário com expressões regulares, custos de transação (gas fees), o ciclo de mineração e confirmação de blocos (`tx.wait()`) e o princípio da atomicidade e reversão de transações em Solidity.
* **Objetivos de Aprendizagem:** O aluno deve compreender como acoplar e desacoplar variáveis de configuração em projetos Web3 (como o uso de `.env`), validar entradas numéricas no frontend usando Regex, assinar transações de alteração de estado na MetaMask, entender o papel das gas fees e dos nós validadores, monitorar a confirmação de blocos via código e explicar a propriedade de atomicidade e reversão em Solidity.

### 🔑 2. Conceitos-Chave e Definições
* **Desacoplamento de Configurações:** Prática de separar parâmetros mutáveis (como o endereço de deploy de um contrato) do código principal, utilizando variáveis de ambiente (arquivos `.env`) para facilitar deploys em diferentes infraestruturas (ex: contêineres Docker, Vercel).
* **Expressões Regulares (Regex):** Padrões de caracteres matemáticos usados para realizar buscas, substituições e validações de strings (ex: `/^\d+$/` para verificar se um texto contém apenas dígitos inteiros).
* **Gas Fee (Taxa de Rede):** Custo em Ether pago pelo usuário para executar transações que alteram o estado da blockchain, cuja finalidade é remunerar os validadores da rede pelo poder computacional gasto.
* **Nó Validador:** Computador participante do consenso da rede blockchain encarregado de agrupar transações em blocos, executar os bytecodes das transações e mantê-las registradas no histórico imutável.
* **Atomicidade:** Propriedade que garante que uma transação de blockchain seja executada por completo ou não seja executada de forma alguma. Se qualquer operação falhar, todo o estado anterior é restaurado.
* **Reversão (`revert`):** Interrupção abrupta na execução de uma função de contrato inteligente que desfaz todas as alterações de dados feitas na transação até aquele ponto, estornando o estado do ledger.
* **`require`:** Função nativa em Solidity usada para validar condições de execução. Se a condição especificada for falsa, a execução é interrompida imediatamente e ocorre a reversão da transação, opcionalmente retornando uma mensagem de erro.
* **`tx.wait()`:** Método da biblioteca `ethers.js` que pausa a linha de execução do frontend até que a transação correspondente seja incluída em um bloco minerado e confirmada pela rede blockchain.
* **Chamada Externa de Contrato:** Capacidade que um contrato inteligente possui de invocar e executar funções de outro contrato inteligente já implantado na mesma blockchain.

### 📝 3. Explicação Detalhada por Tópicos

* **Organização das Configurações do Projeto e Variáveis de Ambiente:**
  * O professor discute a boas práticas de desenvolvimento de software no que diz respeito a configurações fixas no código (*hard-coded*).
  * Em ambientes reais, o ideal é extrair chaves e endereços para um arquivo de variáveis de ambiente (`.env`) e ler via `process.env.CONTRACT_ADDRESS`. Isso permite que a aplicação mude de contrato sem precisar de novas compilações do código-fonte ou rebuilds de contêineres Docker/Vercel.
  * Por ser um script frontend vanilla simples rodando diretamente no navegador, a importação direta de bibliotecas de Node (como `dotenv` via `require`) gera exceções de escopo. Por razões didáticas, o professor reverte o ajuste e mantém temporariamente o endereço fixo no [app.js](file:///Ubuntu/home/victorhugo/cc-blockchain-e-web-3-2026.1/aulas/pratica/aula-1/frontend/app.js).

* **Validação de Inputs com Expressões Regulares (Regex):**
  * Para evitar o envio de dados incorretos à blockchain, o frontend realiza a validação do campo de texto antes de disparar a transação.
  * O professor aborda o conceito de **Expressões Regulares (Regex)**, demonstrando como testar se a entrada é um número inteiro válido usando o padrão `/^\d+$/`:
    * `^` indica o início da string.
    * `\d` representa qualquer caractere de dígito de 0 a 9.
    * `+` indica que o dígito deve se repetir uma ou mais vezes.
    * `$` indica o final da string.
  * Se a entrada falhar no teste, a aplicação exibe um alerta e impede a chamada à blockchain. Exemplos complexos de Regex (como validações de e-mail e CPF) também são comentados.

* **Fluxo de Escrita em Variáveis de Estado (`set`):**
  * Quando o usuário clica no botão **Set**, a aplicação chama a função `set(value)` do contrato.
  * Diferente de consultas (`getMessage` ou `get`), a escrita de dados exige alteração na blockchain.
  * A MetaMask abre uma janela de consentimento, informando que a transação consumirá fundos e exibindo a taxa de gas cobrada (ex: 17 centavos de dólar convertidos em Ether).
  * O professor explica a lógica da taxa: ela incentiva financeiramente os **nós validadores** a manterem a infraestrutura de processamento da rede.

* **Mineração, Confirmação e o método `tx.wait()`:**
  * Uma vez que a transação é confirmada e assinada pelo usuário na MetaMask, ela é transmitida para a rede.
  * O método do contrato retorna uma transação (`tx`). No JavaScript, chama-se:
    ```javascript
    await tx.wait();
    ```
  * Esse comando bloqueia a execução do JavaScript até que a transação seja minerada e colocada em um bloco. Após a confirmação, o frontend chama a função `get()` do contrato para obter a variável atualizada e exibir a mensagem de sucesso na interface do usuário.

* **Princípio de Atomicidade e Reversão em Solidity:**
  * Durante os testes de debug, o console exibe a mensagem de erro `Transaction reverted without a reason`. Mesmo com a mensagem, o valor do contrato é alterado. O professor explica que isso ocorre por ruídos do ambiente local e usa a oportunidade para detalhar o funcionamento computacional da **reversão**.
  * Em Solidity, a execução de transações é **atômica**:
    1. Se uma função possui múltiplos passos (ex: transferir fundos, salvar registro local, chamar contrato secundário).
    2. Se os dois primeiros passos executam com sucesso, mas o terceiro passo falha (reverte ou gera erro).
    3. A EVM reverte a transação inteira: todas as transferências e alterações de variáveis dos passos 1 e 2 são desfeitas na memória global, retornando o estado anterior ao início da chamada.
  * A validação de pré-condições é feita usando a instrução `require(condicao, "erro")`. Se a condição for falsa, o processamento para e desfaz todas as alterações de estado até então.

### 💡 4. Exemplos Práticos e Analogias
* **Analogia da Dockerização e Contêineres:** Ter um endereço de contrato fixo no frontend é como pintar a parede de uma casa alugada com uma cor muito específica. Se você precisar mudar de casa (de blockchain ou rede), terá que refazer todo o trabalho de pintura. Utilizar variáveis de ambiente é como usar luzes de LED programáveis na parede: você altera a cor projetada (o parâmetro do contrato) apenas mudando a configuração no painel (o contêiner), sem tocar na tinta (o código-fonte).
* **Analogia da Atomicidade (A Compra no Caixa):** Imagine que você vai ao supermercado. O caixa registra as compras (passo 1: ler itens), você passa o cartão de crédito e o banco aprova o débito (passo 2: transferir dinheiro), mas a sacola plástica rasga e todos os produtos caem no chão (passo 3: erro inesperado). Na blockchain, a atomicidade garante que a transação inteira seja cancelada: os produtos voltam para a prateleira e o dinheiro é devolvido instantaneamente ao seu cartão, como se você nunca tivesse entrado na fila.
* **O Papel do `tx.wait()` (O Protocolo do Cartório):** Enviar uma transação para a blockchain é como dar entrada em uma escritura de imóvel no cartório. O atendente te dá um protocolo provisório de entrada (o objeto `tx`). Chamar `tx.wait()` equivale a aguardar o prazo legal para que o escrivão registre a escritura no livro oficial de imóveis (mineração no bloco). Apenas após esse carimbo oficial de confirmação você pode declarar que o imóvel é seu (exibir a confirmação na tela).

### 🎯 5. Resumo dos Pontos Críticos (O que vai cair na prova)
* A importância do desacoplamento de configurações e variáveis de ambiente em deploys profissionais (uso do `.env`).
* A diferença operacional no processamento de escrita: requer transmissão de transação, assinaturas digitais na MetaMask e pagamento de taxas de gas aos validadores.
* A utilização do método `tx.wait()` para coordenar a sincronização assíncrona entre a emissão da transação e sua mineração final no bloco de dados.
* A definição do princípio de **Atomicidade** em contratos inteligentes: execução integral ou reversão completa ao estado inicial.
* A sintaxe e comportamento do método **`require`** em Solidity como mecanismo central de validação e gatilho de reversão criptográfica na EVM.

### ❓ 6. Questões de Autoavaliação (Estilo Flashcard)
* **Pergunta 1: Explique por que o comando `await tx.wait()` é necessário no frontend após invocar uma função de escrita de um contrato inteligente.**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Porque as transações que alteram dados na blockchain não são instantâneas. Quando a função de escrita é chamada, a carteira apenas assina e envia a transação para o pool de pendências da rede (mempool). O método retorna uma promessa com a transação pendente. O `tx.wait()` é necessário para travar a execução do código até que a transação seja de fato selecionada por um validador, processada e incluída em um bloco minerado, garantindo que a informação foi persistida na rede antes de o frontend prosseguir.
  </details>

* **Pergunta 2: O que significa dizer que as transações executadas dentro da EVM (Ethereum Virtual Machine) possuem comportamento atômico?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Significa que a execução de todas as instruções presentes em uma transação funciona como uma unidade indivisível. Se todas as linhas de código da função forem executadas com sucesso, as alterações de estado são confirmadas globalmente na blockchain. Se ocorrer qualquer falha ou interrupção (como um estouro de gas ou validação incorreta no `require`) no meio do caminho, toda a execução é abortada e a EVM restaura as variáveis de estado ao valor exato anterior ao início da transação.
  </details>

* **Pergunta 3: Como a instrução `require` atua em Solidity e qual o efeito prático de sua falha no gas do usuário?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    A instrução `require` valida uma pré-condição lógica obrigatória. Se a expressão for verdadeira, a execução prossegue normalmente. Se a expressão for avaliada como falsa, a execução do contrato é imediatamente interrompida, todas as alterações feitas no estado do contrato são revertidas (rolled back) e a transação é cancelada. O usuário perde a taxa de gas consumida até a linha do erro (que recompensa os validadores pelo processamento efetuado), mas o saldo principal da carteira e o estado do contrato são protegidos de alterações indevidas.
  </details>

* **Pergunta 4: Para que servem expressões regulares (Regex) em aplicações frontend conectadas à Web 3.0? Dê um exemplo de padrão para validar inteiros.**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Expressões regulares servem para validar dados de entrada no cliente (frontend) antes que a chamada de transação seja enviada à rede, evitando transações desnecessárias que falhariam na EVM (economizando gas). Um exemplo prático de padrão para validar que a string contém apenas números inteiros positivos é `/^\d+$/` (onde `^` demarca o início, `\d+` exige um ou mais dígitos numéricos, e `$` demarca o final da string).
  </details>

* **Pergunta 5: Por que as alterações nas variáveis de estado de um contrato inteligente na rede local do Hardhat são perdidas quando o terminal do nó local é reiniciado?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Porque, por padrão, o nó local de simulação do Hardhat é executado inteiramente na memória RAM do computador de desenvolvimento. Quando o processo do terminal é finalizado, a memória volátil é limpa. Ao reiniciar o comando, o Hardhat recria a blockchain local a partir do bloco gênese (bloco zero), limpando o histórico de transações e contratos implantados anteriormente.
  </details>
