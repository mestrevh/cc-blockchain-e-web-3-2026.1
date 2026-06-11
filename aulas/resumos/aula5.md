**Disciplina:** Blockchain e Web 3.0
**Vídeo de Referência:** @[aulas/videos/Aula 5 - Introdução à Blockchain (Parte 5).mp4]

### 📌 1. Visão Geral e Objetivos
* **Contexto:** Esta aula aprofunda o papel das funções hash criptográficas na segurança da informação, examina os tipos de blockchain com base no controle de acesso e discute a escalabilidade de vazão de transações (TPS). Compreender esses conceitos é essencial para a tomada de decisão no design de arquiteturas centralizadas vs. descentralizadas.
* **Objetivos de Aprendizagem:** O aluno deve compreender as propriedades formais das funções hash (e suas aplicações práticas como checksum e armazenamento de senhas), classificar as diferentes topologias de blockchain (pública, privada, consórcio e híbrida) e entender os fatores de escalabilidade e throughput de redes tradicionais vs. tecnologias baseadas em grafos (Hedera Hashgraph).

### 🔑 2. Conceitos-Chave e Definições
* **Função Hash Criptográfica:** Função matemática que mapeia dados de qualquer tamanho para uma sequência de caracteres de tamanho fixo (digest). É determinística e de via única.
* **Efeito Avalanche:** Propriedade que garante que qualquer pequena alteração na entrada mude o hash resultante de forma imprevisível e drástica.
* **Resistência à Pré-Imagem:** Impossibilidade computacional de reverter um hash, ou seja, descobrir o dado original a partir da sua representação em hash.
* **Resistência à Colisão:** Propriedade que torna computacionalmente inviável encontrar duas entradas diferentes que produzam exatamente o mesmo hash.
* **SHA-256:** Função hash de 256 bits adotada como pilar de integridade na blockchain do Bitcoin.
* **Keccak-256:** Variante do SHA-3 de 256 bits usada na rede Ethereum para transações e contratos inteligentes.
* **RIPEMD-160:** Algoritmo que gera hashes de 160 bits, usado no Bitcoin para compactar endereços públicos.
* **Blockchain Pública:** Rede sem permissão (*permissionless*), transparente e auditável por qualquer participante.
* **Blockchain Privada:** Rede permissionada controlada por uma única organização que gerencia autorizações de leitura e validação.
* **Blockchain de Consórcio:** Rede semi-descentralizada controlada por um grupo predefinido de organizações parceiras com governança compartilhada.
* **Blockchain Híbrida:** Modelo que integra facilidades privadas (controle de acesso) e públicas (validação e auditoria externa).
* **Throughput (TPS):** Vazão de transações por segundo processadas e consolidadas por uma rede distribuída.
* **Directed Acyclic Graph (DAG):** Estrutura de dados não linear (grafos) usada por redes como a Hedera Hashgraph para processamento paralelo, superando os gargalos de escalabilidade das blockchains lineares tradicionais.
* **HBAR:** Token nativo da rede Hedera Hashgraph usado para pagamento de taxas de transação e governança.

### 📝 3. Explicação Detalhada por Tópicos

* **Propriedades Críticas das Funções Hash:**
  * **Determinismo:** A mesma entrada precisa gerar exatamente a mesma saída a cada execução.
  * **Unidirecionalidade (Via Única):** O cálculo deve ser fácil em uma direção, mas inviável na inversa. A segurança é matemática e não institucional.
  * **Efeito Avalanche:** Pequenas perturbações na entrada mudam a representação do hash.
  * **Resistência a Colisões:** Encontrar duas entradas com o mesmo hash compromete a segurança. Algoritmos antigos como MD5 e SHA-1 possuem falhas conhecidas de colisão, enquanto SHA-256 e Keccak-256 permanecem seguros.
  * **Saída de Tamanho Fixo:** Independentemente de a entrada ser 1 caractere ou um arquivo de 1 GB, a saída mantém o mesmo tamanho (ex. 256 bits no SHA-256), facilitando comparações computacionais rápidas.

* **Aplicações Práticas das Funções Hash:**
  * **Armazenamento de Senhas:** Aplicações seguras guardam apenas o hash das senhas dos usuários. No login, o hash da senha digitada é gerado e comparado com o armazenado no banco de dados. *(Nota: O conceito de **Salt**, que adiciona dados aleatórios antes de aplicar o hash para evitar ataques de dicionário, é mencionado e será detalhado na próxima aula).*
  * **Checksum (Soma de Verificação):** Garante a integridade física de arquivos na internet. Downloads de sistemas operacionais fornecem assinaturas que o usuário pode comparar localmente para atestar que o arquivo não está corrompido ou malicioso.

* **Taxonomia das Redes Blockchain:**
  * **Públicas:** Totalmente descentralizadas. Nós validadores operam em código aberto (*open source*). O repositório Go-Ethereum (*Geth*) no GitHub demonstra essa transparência. Exemplos: Bitcoin e Ethereum.
  * **Privadas:** Uma única empresa gerencia os nós validadores. Tem foco em controle, privacidade interna e velocidade. Exemplo: Hyperledger Fabric.
  * **Consórcio:** Um grupo de empresas se junta para governar a rede. Útil para cooperação sem confiança mútua. O professor cita o exemplo das empresas brasileiras de petróleo (Petrobras, Shell, Chevron, Total) cooperando em conjunto com a ANP para auditar o mercado de gás natural. Outros exemplos: R3 Corda, Energy Web Chain e BRICS Pay.
  * **Híbridas:** Transações pequenas ocorrem em ambientes públicos de auditoria simples, e movimentações corporativas de alta sensibilidade rodam em rede restrita privada. Exemplo: Dragonchain.

* **TPS, Escalabilidade e a Tecnologia Hashgraph (Hedera):**
  * **O Gargalo da Serialização:** Redes tradicionais processam transações sequencialmente (serialização), acumulando-as em blocos lineares, o que limita o TPS (Bitcoin processa ~3-7 TPS; Ethereum original ~12-15 TPS).
  * **A Proposta da Hedera Hashgraph:** Utiliza a tecnologia DAG (grafo acíclico) e consenso de "fofoca sobre fofoca" (*gossip about gossip*) para processar transações de forma contínua e paralela.
  * **Vantagens de Escalabilidade:** Hedera atinge mais de 10.000 TPS, com finalização ultrarrápida (3-5 segundos) e taxas de transação extremamente baixas (na casa de $0.0001).
  * **Governança:** A Hedera é administrada por um conselho de grandes multinacionais de tecnologia (Google, IBM, LG, Ubisoft). A moeda da rede é a HBAR.

### 💡 4. Exemplos Práticos e Analogias

* **O Checksum do Debian e a Autenticidade da Fonte:** Ao baixar uma imagem ISO do Debian (~754 MB), o site fornece sua assinatura SHA-256 ou SHA-512. O usuário pode rodar a verificação no computador local. Se o hash local coincidir com o do site, o arquivo está íntegro. O professor ressalta: se o hacker controlar a fonte (site falso), ele pode fraudar a assinatura e o arquivo. Daí a importância de verificar a validade dos certificados SSL/TLS da página web original.
* **A Analogia do Consórcio de Petróleo:** Se a Petrobras mantivesse sozinha a base de dados de gás natural de todo o setor, as concorrentes (Shell, Chevron) não confiariam. Se a ANP mantiver um servidor centralizado, há pontos únicos de falha e auditoria restrita. A blockchain de consórcio compartilha os nós de validação entre os concorrentes e o regulador, garantindo segurança coletiva no registro de dados confidenciais sem expor os dados ao público.
* **A Analogia do Gargalo de Trânsito (Fila vs. Cruzamento Livre):** A blockchain tradicional funciona como uma fila única de pedágio onde cada carro (transação) precisa passar de forma sequencial por uma única cancela. A Hedera Hashgraph funciona como um cruzamento inteligente sem cancelas, onde os carros se movem em fluxos paralelos e contínuos, trocando informações em tempo real para evitar acidentes (conflitos) e aumentar drasticamente a vazão.

### 🎯 5. Resumo dos Pontos Críticos (O que vai cair na prova)

* As **cinco propriedades fundamentais das funções hash** (determinismo, unidirecionalidade, efeito avalanche, resistência à colisão e tamanho fixo).
* A diferença entre **blockchain pública** (sem permissão, open source, auditável), **privada** (controle central) e **consórcio** (semi-descentralizada, governança corporativa compartilhada).
* O funcionamento e a importância do **Checksum** para integridade de arquivos e o papel dos certificados digitais de segurança na autenticação de sua origem.
* O **Throughput (TPS)** como limitador de escalabilidade de blockchains sequenciais, contrastando com a tecnologia **Hashgraph (DAG)** que valida transações em paralelo.

### ❓ 6. Questões de Autoavaliação (Estilo Flashcard)

* **Pergunta 1: Como o Efeito Avalanche auxilia na integridade de dados salvos em uma Blockchain?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    O Efeito Avalanche garante que qualquer mínima alteração de dados em um bloco anterior mude completamente o hash resultante do bloco. Como cada bloco subsequente aponta para o hash do bloco anterior, toda a cadeia a partir do ponto alterado é invalidada imediatamente. Isso impede que dados antigos sejam editados de forma fraudulenta sem que a rede perceba.
  </details>

* **Pergunta 2: Qual é a distinção de governança entre a blockchain de consórcio e a blockchain privada?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    Na blockchain privada, uma única organização controla totalmente a governança, as regras de negócios e a validação das transações. Na blockchain de consórcio, a validação e a governança são distribuídas de forma compartilhada entre múltiplas organizações pré-selecionadas (ex. empresas de um setor e agências reguladoras), evitando a centralização em um único participante.
  </details>

* **Pergunta 3: O que é o Checksum e qual é a sua limitação se a fonte de validação estiver comprometida?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    O Checksum é a soma de verificação por hash que valida se um arquivo não foi modificado. A limitação ocorre se a fonte que exibe o checksum (como o site de download) estiver comprometida ou sob ataque de falsificação (ex. DNS spoofing). O hacker pode alterar tanto o arquivo quanto o hash exibido na página, enganando o usuário. Por isso, a validação exige também a verificação de certificados SSL/TLS da página web.
  </details>

* **Pergunta 4: Por que a Hedera Hashgraph consegue atingir mais de 10.000 TPS enquanto a blockchain do Bitcoin processa cerca de 3-7 transações por segundo?**
  <details>
    <summary><b>Ver Resposta</b></summary>
    O Bitcoin processa transações de forma sequencial e em blocos lineares e rígidos, gerando filas de espera de processamento (serialização). A Hedera Hashgraph usa uma estrutura em grafo (DAG) sem formação de blocos rígidos, o que permite processar e validar transações em paralelo de forma contínua usando o consenso distribuído de "fofoca sobre fofoca" (gossip about gossip).
  </details>
