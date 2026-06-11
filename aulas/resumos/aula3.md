**Disciplina:** Blockchain e Web 3.0
**Vídeo de Referência:** @[aulas/videos/Aula 3 - Introdução à Blockchain (Parte 3).mp4] 

### 📌 1. Visão Geral e Objetivos
* **Contexto:** Esta aula aprofunda a introdução aos conceitos fundamentais da tecnologia Blockchain, detalhando suas características principais, como dados são persistidos e a anatomia de um bloco. O tema é essencial para compreender como a rede garante segurança, transparência e descentralização sem depender de uma entidade ou servidor central.
* **Objetivos de Aprendizagem:** O aluno deve ser capaz de identificar as propriedades fundamentais de uma blockchain (como imutabilidade e distribuição), compreender a estrutura interna de um bloco (Header, Hash, Timestamp, Nonce, Merkle Root) e entender conceitos práticos como exploradores de blocos e vetores de ataques comuns (como o ataque de reprodução).

### 🔑 2. Conceitos-Chave e Definições
* **Distributed Ledger (Livro-razão distribuído):** Banco de dados mantido e atualizado de forma descentralizada por múltiplos nós da rede, sem um administrador ou servidor centralizador.
* **Imutabilidade:** Propriedade que garante que, uma vez que uma informação é gravada e consolidada na blockchain, ela não pode ser alterada, modificada ou apagada.
* **Endereço (Carteira / Chave Pública):** Identificador público único do usuário na rede (comparado a um CPF ou número de conta bancária), utilizado para receber transações.
* **Chave Privada:** Senha criptográfica secreta que permite ao usuário autorizar transações e manipular os dados e fundos vinculados ao seu endereço na blockchain.
* **Block Explorer (Explorador de Blocos):** Ferramenta (como o Etherscan) que funciona como um motor de busca para a rede, permitindo visualizar transações, blocos minerados e endereços de uma blockchain pública em tempo real.
* **Timestamp:** Marcação de tempo computacional em formato numérico inteiro (geralmente segundos ou milissegundos desde a Era Unix) que registra e imortaliza o momento exato em que um bloco ou transação foi criado.
* **Parent Hash (Hash do Bloco Anterior):** Assinatura criptográfica do bloco imediatamente anterior, responsável por encadear os blocos de forma sequencial e formar a "corrente" (chain).
* **Nonce (Number used once):** Valor numérico aleatório ou sequencial utilizado uma única vez na validação e construção do bloco (mineração).
* **Merkle Root:** Raiz de uma árvore de hashes que sumariza, empacota e garante a integridade e autenticidade de todas as transações incluídas em um bloco.
* **Ataque de Reprodução (Replay Attack):** Ataque onde uma comunicação ou transação válida é interceptada e reenviada maliciosamente por terceiros.

### 📝 3. Explicação Detalhada por Tópicos
* **Características Principais da Blockchain:**
  * **Registro Distribuído:** Elimina-se o servidor central. Todos os nós participantes que mantêm a rede possuem uma cópia integral do livro-razão e aplicam regras de consenso para atualizá-la.
  * **Dados Permanentes e Imutáveis:** A impossibilidade de retroagir e alterar dados torna a tecnologia um ambiente de extrema confiança (trustless), ideal para cenários sensíveis como registros médicos e votações eletrônicas.
  * **Transparência e Rastreabilidade:** Em blockchains públicas, qualquer indivíduo pode inspecionar e rastrear qualquer transação de ponta a ponta. A privacidade é mantida através do pseudo-anonimato: você enxerga a string do endereço, mas não sabe necessariamente qual humano ou empresa o controla.
  * **Segurança Criptográfica Avançada:** O uso estrito de chaves assimétricas garante que apenas o legítimo dono da chave privada consiga realizar débitos ou envios de seu respectivo endereço.

* **Novos Modelos de Negócio e Micropagamentos:**
  * O modelo bancário convencional não suporta transferências de frações mínimas de centavos devido ao elevado custo por transação.
  * Com o uso de contratos inteligentes e redes secundárias, a blockchain viabiliza **micropagamentos** de máquina para máquina. O professor dá o exemplo do código HTTP nativo `402 Payment Required`, que foi projetado para isso mas raramente usado por falta de infraestrutura na Web2, e que agora ganha força na Web3.

* **Estrutura e Anatomia de um Bloco:**
  * A blockchain agrupa as requisições (transações) em blocos. O **Cabeçalho do Bloco (Block Header)** concentra as metainformações.
  * O **Parent Hash** é a engrenagem que sela a imutabilidade: se alguém tentar falsificar um dado de um bloco antigo, o hash desse bloco mudará drasticamente (efeito avalanche). Consequentemente, o bloco seguinte (que guarda o Parent Hash) não reconhecerá a cadeia, quebrando a sequência e invalidando o ataque perante a rede.
  * O **Timestamp** numérico no bloco elimina a necessidade de fusos horários humanos complexos, garantindo uma datação global padronizada e matemática daquela aprovação.

* **Ataques de Identidade e Reprodução (Replay Attack):**
  * Na blockchain, a comunicação do seu computador para o nó validador viaja pela internet aberta.
  * Se um usuário assina uma transação "Eu pago 10 reais para o João" e não insere nenhum elemento temporal/único, um hacker no meio do caminho captura esses bytes e os reenvia repetidas vezes, esgotando a carteira da vítima.
  * O remédio para esse vetor de ataque é a adição de um **Timestamp** ou um **Nonce** serial no corpo da mensagem *antes* da assinatura, impossibilitando que a cópia idêntica da mensagem bruta seja acatada duas vezes pela rede.

### 💡 4. Exemplos Práticos e Analogias
* **Analogia da Conta Bancária:** O *Endereço* é o seu número de conta e agência bancária — você imprime no seu cartão de visitas e passa para qualquer um. A *Chave Privada* é a sua senha de 6 dígitos e biometria juntas — você não compartilha com absolutamente ninguém e a utiliza unicamente para transferir valores.
* **Explorador Etherscan na Prática:** O professor abre ao vivo o *Etherscan* (explorador da Ethereum) para mostrar que a rede é como um auditório de vidro. Ele mostra blocos sendo produzidos em intervalos de 12 segundos e transferências, algumas valendo centavos e outras envolvendo quantias altíssimas, ocorrendo globalmente e visíveis a qualquer um com um navegador web.
* **O Problema do Replay Attack:** Imagine assinar um cheque em branco apenas com "Pague R$ 100". O cobrador poderia tirar cópias do cheque e compensá-lo várias vezes. O número de série no talão de cheques funciona como o *Nonce* da transação blockchain, garantindo que aquela via específica seja compensada apenas uma vez.

### 🎯 5. Resumo dos Pontos Críticos (O que vai cair na prova)
* Uma Blockchain tem como base os pilares do **registro distribuído** (sem controle central), da **imutabilidade** (inviabilidade de exclusão ou edição) e do **pseudo-anonimato** (contas públicas rastreáveis, identidades ocultas).
* A relação de continuidade e proteção do passado baseia-se primordialmente no **Parent Hash** (Hash do Bloco Anterior).
* O controle de tempo é gerido por um **Timestamp** numérico de base computacional (ex. Inteiro Unix), não dependendo de convenções de formatação humanas como dd/mm/aaaa.
* A validação de quem está agindo na rede provém da **Chave Privada**, enquanto um **Ataque de Reprodução (Replay Attack)** é prevenido através de mecanismos de autenticação com dados descartáveis ou mutáveis no tempo (como Nonce e Timestamp).

### ❓ 6. Questões de Autoavaliação (Estilo Flashcard)
* **Pergunta 1:** Qual é a função da Chave Pública (Endereço) e da Chave Privada em uma rede Blockchain?
  ```html
  <details>
    <summary><b>Ver Resposta</b></summary>
    A Chave Pública atua como um endereço ou identificador para recebimentos, visível publicamente. A Chave Privada atua como a senha que confere posse sob a conta, permitindo que o usuário assine e autorize o gasto dos saldos ou a interação com contratos inteligentes.
  </details>
  ```
* **Pergunta 2:** O que torna a blockchain imutável ao longo do tempo? Qual componente do bloco é fundamental para isso?
  ```html
  <details>
    <summary><b>Ver Resposta</b></summary>
    O componente fundamental é o "Hash do Bloco Anterior" (Parent Hash). Ele cria um elo criptográfico sequencial; se os dados de qualquer bloco antigo forem alterados, seu hash será completamente modificado, quebrando o elo com o bloco seguinte e invalidando a fraude perante o restante da rede.
  </details>
  ```
* **Pergunta 3:** Como funciona a dicotomia entre transparência total e privacidade em blockchains públicas?
  ```html
  <details>
    <summary><b>Ver Resposta</b></summary>
    A rede é 100% transparente pois permite que qualquer pessoa rastreie o saldo e as transações de todos os endereços via Exploradores de Blocos. Contudo, há privacidade na forma de pseudo-anonimato, pois a criação de um endereço não exige vínculo formal e obrigatório com os dados reais de um indivíduo (como nome ou CPF).
  </details>
  ```
* **Pergunta 4:** O que é um Replay Attack (Ataque de Reprodução) e qual a técnica usada para mitigá-lo nas assinaturas de transações?
  ```html
  <details>
    <summary><b>Ver Resposta</b></summary>
    O ataque ocorre quando um indivíduo intercepta a comunicação de uma transação perfeitamente válida e tenta reenviá-la à rede para executá-la repetidas vezes em proveito próprio. A mitigação é feita adicionando um carimbo de tempo (Timestamp) ou um número sequencial único (Nonce) no momento da assinatura, tornando qualquer cópia duplicada inválida e recusada pela rede.
  </details>
  ```