**Disciplina:** Blockchain e Web 3.0
**Vídeo de Referência:** `Aula 2 - Introdução à Blockchain (Parte 2).mp4`

### 📌 1. Visão Geral e Objetivos
* **Contexto:** Nesta aula, o professor apresenta uma visão detalhada da estrutura geral da disciplina e aprofunda conceitos vitais sobre o funcionamento das redes Blockchain, especialmente sobre arquitetura de redes e mecanismos de consenso. O entendimento desses pilares é fundamental para entender como redes descentralizadas mantêm segurança sem uma autoridade central.
* **Objetivos de Aprendizagem:** O aluno deve ser capaz de diferenciar modelos de consenso (PoW vs PoS), entender a estrutura de disciplinas que envolvem a Web3 e compreender o que são Smart Contracts e como o processamento computacional ocorre e é cobrado nessas redes.

### 🔑 2. Conceitos-Chave e Definições
* **Proof of Work (PoW):** Mecanismo de consenso utilizado pelo Bitcoin que exige alto poder computacional (esforço físico e gasto elétrico) para resolver desafios matemáticos e ter o direito de validar um bloco.
* **Proof of Stake (PoS):** Mecanismo de consenso alternativo (adotado pelo Ethereum em sua atualização) onde a validação não depende de poder computacional, mas da quantidade de moedas (stake) que um participante possui bloqueadas na rede.
* **Smart Contracts:** Contratos inteligentes que são essencialmente códigos de programação autoexecutáveis armazenados na blockchain. Eles possuem a capacidade de manter estado, tomar decisões lógicas e transferir valor.
* **Ethereum Virtual Machine (EVM):** Máquina virtual responsável por executar os Smart Contracts na rede Ethereum de maneira descentralizada.
* **Consenso:** Processo pelo qual diversos nós (computadores) em uma rede peer-to-peer (P2P) concordam sobre qual é a versão verdadeira e válida do registro de transações.

### 📝 3. Explicação Detalhada por Tópicos
* **Mecanismos de Consenso:**
  * O professor explicou que o Bitcoin se popularizou porque encontrou uma forma de redes P2P entrarem em consenso de forma confiável usando o **PoW**.
  * No PoW, quem tem mais poder de processamento (clusters de mineração) tem mais chances de minerar o bloco e ganhar a recompensa. Isso gerou um enorme problema ecológico (alto consumo de energia global).
  * Devido a isso, redes mais modernas migraram para o **PoS**. No PoS, a "força" do validador não vem de supercomputadores gastando energia, mas sim do seu balanço financeiro travado na rede (os validadores "apostam" suas moedas para validar blocos).
* **Smart Contracts e Custo Computacional:**
  * Diferente do Bitcoin, que apenas registra transferências financeiras, plataformas como o Ethereum rodam código de verdade.
  * O código é escrito numa linguagem chamada **Solidity** e executado na **EVM**.
  * Como rodar código exige processamento real de milhares de computadores, toda operação computacional custa uma taxa (frequentemente chamada de "Gas"). Se um contrato entra em loop infinito, ele consome a taxa do usuário até o dinheiro acabar e a transação ser abortada, protegendo a rede.
* **A imutabilidade dos Contratos:**
  * Uma vez que um Smart Contract é implantado na blockchain, seu código não pode ser alterado. Qualquer falha lógica pode ser catastrófica, permitindo que cibercriminosos drenem todos os fundos mantidos pelo contrato.

### 💡 4. Exemplos Práticos e Analogias
* **Analogia da Votação (Consenso):** Para explicar os diferentes tipos de consenso, o professor comparou o modelo a uma eleição. Em um modelo clássico, cada pessoa tem um voto. No modelo Proof of Stake, se você tiver R$ 10, seu voto vale 10 vezes mais do que o de alguém que tem R$ 1. Quem tem mais dinheiro investido na rede tem mais poder de validação, pois também tem mais a perder se a rede falhar.
* **Analogia do Sistema SWIFT vs Blockchain:** O sistema bancário tradicional internacional usa o SWIFT, fortemente controlado por órgãos americanos. Se eles desejarem, podem bloquear as transferências de um país. A Blockchain surge como uma alternativa similar a países tentando criar o "BRICS Pay": uma rede autônoma e imutável que não pode ser facilmente censurada por uma entidade central.

### 🎯 5. Resumo dos Pontos Críticos (O que vai cair na prova)
* A diferença entre **Proof of Work (PoW)**, que se baseia em esforço computacional e gasto elétrico, e **Proof of Stake (PoS)**, que se baseia em retenção de ativos (stake) e é mais eficiente.
* A definição e o papel fundamental do **Consenso**: garantir a veracidade dos dados em uma rede onde os participantes não confiam uns nos outros.
* O conceito de **Smart Contracts**, e o fato crítico de que eles são imutáveis após implantação, necessitando auditorias rigorosas.
* A função da **EVM** (Ethereum Virtual Machine) em processar as instruções lógicas do Solidity.

### ❓ 6. Questões de Autoavaliação (Estilo Flashcard)
* Qual é a principal crítica feita ao modelo Proof of Work (PoW) e como o Proof of Stake (PoS) tenta resolver isso?
  <details>
    <summary><b>Ver Resposta</b></summary>
    O PoW é criticado por seu altíssimo consumo de energia elétrica, já que exige hardware especializado fazendo cálculos constantes. O PoS resolve isso ao eliminar a necessidade de supercomputadores, baseando o direito de validar blocos na quantidade de tokens que o validador bloqueia na rede.
  </details>

* O que é um Smart Contract e qual é a sua principal característica de segurança/risco após a publicação?
  <details>
    <summary><b>Ver Resposta</b></summary>
    É um código de programação autoexecutável hospedado na blockchain. Seu maior risco é a **imutabilidade**: uma vez publicado, não pode ser editado. Se houver um bug, hackers podem explorá-lo sem que o criador possa simplesmente "atualizar" o código original para interromper o ataque.
  </details>

* O que acontece se um Smart Contract no Ethereum entrar em um "loop infinito" durante a execução?
  <details>
    <summary><b>Ver Resposta</b></summary>
    A rede não irá travar. O contrato consumirá a "taxa" (Gas) fornecida pelo usuário a cada operação. Quando a taxa acabar, a transação será interrompida (revertida) por falta de fundos, preservando a disponibilidade da EVM.
  </details>

* O que significa dizer que uma rede não possui um nó central de confiança?
  <details>
    <summary><b>Ver Resposta</b></summary>
    Significa que nenhuma única entidade (como um banco ou servidor central) dita qual é a versão verdadeira do banco de dados. Em vez disso, a veracidade é garantida através do algoritmo de consenso operado de forma distribuída pelos nós da rede.
  </details>
