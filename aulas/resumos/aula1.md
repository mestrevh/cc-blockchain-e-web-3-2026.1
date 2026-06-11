**Disciplina:** Blockchain e Web 3.0
**Vídeo de Referência:** @[aulas/videos/Aula 1 - Introdução à Blockchain (Parte 1).mp4]

### 📌 1. Visão Geral e Objetivos
* **Contexto:** Esta aula inicial apresenta os conceitos fundamentais de Blockchain e Web 3.0, contrapondo a evolução da internet (Web 1.0 e 2.0) com as novas tecnologias descentralizadas. A importância reside em entender as limitações dos sistemas centralizados atuais e como a blockchain propõe soluções inovadoras de segurança, autonomia e distribuição de confiança.
* **Objetivos de Aprendizagem:** Ao final da aula, o aluno deve compreender a diferença arquitetural entre redes centralizadas e descentralizadas, o papel fundamental das funções hash na imutabilidade dos dados, a necessidade do consenso em redes distribuídas para evitar fraudes, e a utilidade dos smart contracts.

### 🔑 2. Conceitos-Chave e Definições
* **Web 1.0:** Primeira fase da internet, caracterizada por páginas estáticas (apenas leitura) onde os usuários eram puramente consumidores de conteúdo, sem interação dinâmica.
* **Web 2.0:** A internet interativa e social, onde os usuários produzem conteúdo (ex: redes sociais, fóruns), porém baseada em plataformas e servidores **centralizados**, controlados por grandes empresas corporativas.
* **Web 3.0 (Web3):** A nova geração da internet focada na **descentralização**, utilizando tecnologias como blockchain para que os usuários tenham posse e controle de seus próprios dados, transacionando sem a necessidade de um intermediário central.
* **Descentralização:** Arquitetura de rede (como a P2P - *Peer-to-Peer*) onde não há um servidor central único; o controle, as validações e o armazenamento de dados são distribuídos entre os vários "nós" (computadores) participantes da rede.
* **Hash:** Uma função matemática e criptográfica que transforma qualquer dado de entrada em uma sequência de caracteres de tamanho fixo (ex: algoritmo SHA-512). É irreversível e qualquer mínima alteração na entrada gera um hash completamente diferente (propriedade de efeito avalanche).
* **Gasto Duplo (Double Spending):** O problema clássico da computação de se utilizar o mesmo ativo digital (como um arquivo ou moeda virtual) mais de uma vez. A blockchain resolve isso usando o consenso e um livro-razão público.
* **Consenso:** Mecanismo através do qual os nós de uma rede descentralizada concordam coletivamente sobre qual é a versão verdadeira da realidade (ex: quais transações são válidas), garantindo a segurança da rede sem depender de um servidor central confiável.
* **Smart Contracts (Contratos Inteligentes):** Programas de computador autoexecutáveis que rodam dentro de uma blockchain, executando lógicas e regras automaticamente quando condições pré-definidas são atendidas, dispensando intermediários humanos ou institucionais.
* **DApps (Decentralized Applications):** Aplicativos descentralizados que funcionam conectando um front-end tradicional a um back-end rodando em uma blockchain (usando smart contracts), em vez de servidores centralizados.

### 📝 3. Explicação Detalhada por Tópicos

* **A Evolução da Web e a Arquitetura de Rede:**
  * Na **Web 1.0**, o modelo era majoritariamente estático.
  * Com a **Web 2.0**, o conteúdo passou a ser dinâmico. Tecnologias como AJAX e frameworks de front/back-end permitiram interações ricas, mas solidificaram a arquitetura cliente-servidor (centralizada).
  * **O problema da centralização:** Se o servidor central cai ou toma decisões unilaterais (como censura ou venda de dados), os usuários são afetados sem recurso. Há também pontos únicos de falha (*Single Points of Failure*) para ataques hackers.

* **A Transição para a Web 3.0:**
  * A Web3 adota arquiteturas *Peer-to-Peer* (P2P), onde todos os nós podem agir como clientes e servidores simultaneamente, inspirando-se em tecnologias mais antigas como o Torrent.
  * O grande salto da Web3 foi adicionar uma camada de **registro de estado unificado e seguro**, permitindo que uma rede P2P mantenha um histórico imutável de transações.

* **A Solução da Blockchain e a Matemática do Hash:**
  * Em uma rede descentralizada, precisamos de garantias criptográficas em vez de confiança institucional.
  * Cada bloco de informações na blockchain contém o **hash do bloco anterior**. Isso cria uma corrente inquebrável.
  * Se um nó malicioso tentar alterar uma transação no passado, o hash daquele bloco mudará. Como o bloco seguinte aponta para o hash antigo, a corrente se quebra, e a rede imediatamente rejeita a fraude.

* **O Problema do Gasto Duplo e o Consenso:**
  * No mundo digital tradicional, copiar algo é perfeitamente exato. Isso impede a escassez digital necessária para o dinheiro.
  * Para que uma transação (como o envio de uma moeda) seja validada, os nós precisam chegar a um **consenso** (geralmente mais de 50% de aprovação) de que os fundos existem e não foram gastos duplamente.
  * Os validadores (como mineradores) investem recursos computacionais ou financeiros para participar da rede e são recompensados financeiramente se agirem de forma honesta, criando um forte **incentivo econômico** contra fraudes.

* **Expandindo o Conceito: Smart Contracts e DApps:**
  * Inicialmente, a blockchain servia apenas como um "livro-razão" de saldos (como no Bitcoin).
  * Redes mais recentes (ex: Ethereum) introduziram os **Smart Contracts**, permitindo salvar não só dados, mas **lógica de programação** imutável na rede.
  * Isso permitiu a criação das **DApps**, abrindo portas para sistemas financeiros complexos, jogos e organizações descentralizadas rodando integralmente na Web3.

### 💡 4. Exemplos Práticos e Analogias
* **Analogia da Foto vs. Dinheiro:** O professor usa a foto do celular para ilustrar o "gasto duplo". Se eu tiro uma foto e envio no WhatsApp, eu mantenho a minha cópia e você recebe outra. Essa "cópia infinita" é ótima para informações, mas destrutiva para sistemas financeiros. Se eu envio uma nota de R$ 10, eu não posso continuar com ela. A blockchain funciona como o mecanismo que garante que o "arquivo do dinheiro" trocou de mãos e não foi simplesmente copiado.
* **Analogia do Livro-Razão Público:** Em vez de confiar no servidor de um banco (que pode ser hackeado internamente ou falhar), imagine que todos em uma sala possuem uma cópia exata de um livro de contabilidade. Se alguém tentar dizer "eu tenho 1 milhão", a sala inteira olha para seus livros, percebe a mentira e descarta a transação. Para ter sucesso, o falsificador teria que invadir e alterar o livro de mais da metade da sala ao mesmo tempo (o que se torna inviável computacionalmente em uma rede global).

### 🎯 5. Resumo dos Pontos Críticos (O que vai cair na prova)
* A diferença entre **Web 2.0** (interativa e centralizada) e **Web 3.0** (focada em posse, descentralização e redes P2P).
* A **função Hash** é unidirecional, gera tamanhos fixos e tem o "efeito avalanche". É a base técnica que garante a imutabilidade dos blocos na "corrente".
* O **Gasto Duplo (Double Spending)** é o problema de duplicação digital que a blockchain resolve através do registro público e dos mecanismos de consenso.
* A segurança em redes descentralizadas não vem de uma autoridade, mas do **consenso** da maioria dos nós e de **incentivos econômicos** alinhados.
* A evolução de simples registros de saldos (Bitcoin) para **Smart Contracts** (Ethereum), permitindo que códigos autoexecutáveis rodem de forma descentralizada.

### ❓ 6. Questões de Autoavaliação (Estilo Flashcard)
* **Qual é o principal problema da computação financeira distribuída que a tecnologia Blockchain conseguiu resolver?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    O problema do Gasto Duplo (Double Spending). A blockchain evita que um mesmo ativo digital seja gasto ou copiado mais de uma vez através do uso de um registro público imutável e regras de consenso entre os nós validadores.
  </details>

* **Qual é a principal diferença arquitetural e filosófica entre a Web 2.0 e a Web 3.0?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    A Web 2.0 possui uma arquitetura centralizada (cliente-servidor), onde o poder, as regras e os dados dos usuários pertencem a empresas corporativas. A Web 3.0 é descentralizada (P2P/Blockchain), focada na posse de dados pelo usuário, operando sem a necessidade de um servidor ou entidade central confiável.
  </details>

* **Por que é praticamente impossível alterar uma transação antiga em uma Blockchain?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Porque cada bloco armazena o Hash do bloco anterior. Qualquer alteração em um dado antigo mudaria o Hash desse bloco, invalidando automaticamente todos os blocos gerados depois dele. A rede rapidamente detectaria a anomalia através do consenso e a rejeitaria.
  </details>

* **Como os validadores de uma rede Blockchain são desencorajados a cometer fraudes?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Através de incentivos econômicos (criptomoedas/tokens). Para validar transações, eles precisam gastar recursos reais (como energia elétrica computacional ou deixando moedas em garantia). Se tentarem fraudar, os outros nós rejeitarão o bloco fraudulento e o validador malicioso perderá seu investimento e não receberá a recompensa.
  </details>
