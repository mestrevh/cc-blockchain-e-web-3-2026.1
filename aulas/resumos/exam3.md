# Simulado Teórico: Blockchain e Web 3.0 (Nível Médio)

Este simulado foca exclusivamente na base teórica, definições, propriedades arquiteturais e conceitos fundamentais do ecossistema Blockchain e Web 3.0.

---

### Questão 1
Em relação à arquitetura de rede e distribuição de dados, qual é a principal distinção teórica entre os modelos computacionais da Web 2.0 e da Web 3.0?
- [ ] A) A Web 2.0 utiliza exclusivamente funções hash para armazenar senhas, enquanto a Web 3.0 as substitui por criptografia simétrica de curva elíptica em servidores locais com IP estático.
- [ ] B) A Web 2.0 é caracterizada pela interação e fornecimento de dados em plataformas de arquitetura centralizada (modelo cliente-servidor), enquanto a Web 3.0 opera sobre redes peer-to-peer (P2P) descentralizadas, nas quais a posse, o registro e a validação de dados não dependem de uma entidade única central.
- [ ] C) A Web 3.0 permite apenas a leitura de dados estáticos e imutáveis sem a execução de código, em oposição à Web 2.0, que introduziu linguagens dinâmicas para a criação distribuída em bancos de dados relacionais.
- [ ] D) A Web 2.0 garante a imutabilidade por meio de autoridades certificadoras governamentais, preceito que foi eliminado na Web 3.0 em favor do armazenamento temporário e apagável de blocos.

### Questão 2
Dentre as propriedades fundamentais de uma função hash criptográfica (como o SHA-256), o chamado "efeito avalanche" possui um papel vital na integridade arquitetural de uma blockchain. Como esse conceito se define matematicamente na teoria da segurança da informação?
- [ ] A) É a impossibilidade computacional de reverter um hash gerado de volta para o seu dado original legível (resistência à pré-imagem), assegurando o pseudo-anonimato absoluto das carteiras na rede.
- [ ] B) É o fenômeno que ocorre quando duas entradas estruturalmente distintas produzem ocasionalmente e de forma acidental o mesmo exato hash criptográfico, invalidando transações por falha de colisão geométrica.
- [ ] C) É a propriedade que garante que qualquer pequena alteração ou corrupção na entrada original de dados resulte em um hash de saída imprevisivelmente e completamente diferente. Em redes P2P, isso é essencial para encadear os blocos e denunciar qualquer adulteração histórica.
- [ ] D) É a capacidade técnica do algoritmo em comprimir arquivos de tamanho massivo (como imagens em alta resolução) compactando-os em matrizes fixas de bytes prontas para serem armazenadas fisicamente nas variáveis do contrato inteligente de forma econômica.

### Questão 3
No que tange aos mecanismos de consenso responsáveis por coordenar e validar o livro-razão distribuído em redes descentralizadas sem confiança, qual é a distinção conceitual e sistêmica elementar entre *Proof of Work* (PoW) e *Proof of Stake* (PoS)?
- [ ] A) No PoW, a proteção da rede exige a resolução ininterrupta de problemas criptográficos por meio de intensa força computacional bruta (alto gasto de energia e hardware). No PoS, o poder de validação e criação de blocos baseia-se na quantidade de ativos que o participante possui bloqueados em garantia (stake) dentro da rede, dispensando cálculos agressivos.
- [ ] B) O PoW é utilizado primariamente em redes de consórcio privado por exigir confiança empresarial mútua, enquanto o PoS exige que todos os usuários civis rodem servidores em contêineres na nuvem pública.
- [ ] C) O PoW foca exclusivamente na eliminação do Gasto Duplo no envio direto de moedas, enquanto o PoS foi concebido sob medida para abrigar a Máquina Virtual do Ethereum (EVM) em ambientes centralizados.
- [ ] D) O PoS exige que todos os validadores da rede deleguem a custódia total de suas chaves privadas para uma entidade reguladora única visando diminuir as taxas de gas do PoW ecológico.

### Questão 4
Contratos inteligentes (*Smart Contracts*) são descritos como programas autoexecutáveis hospedados nativamente nos blocos da rede. Do ponto de vista conceitual de sua propriedade estrita de imutabilidade, o que essa característica determina sobre o ciclo de vida da aplicação após a implantação (deploy)?
- [ ] A) O código-fonte convertido em bytecode é perpetuamente engessado. Caso existam falhas lógicas no protocolo, elas não podem ser reparadas através de atualizações que sobrescrevam fisicamente o bloco onde o contrato original foi instanciado.
- [ ] B) A imutabilidade determina que as frações de taxas de rede (gas limit) necessárias para processar o contrato tornam-se inalteráveis, bloqueando qualquer inflação econômica advinda da congestão da Mainnet.
- [ ] C) Os contratos imutáveis perdem a característica de interagir com o estado de armazenamento (*storage*), rodando permanentemente de forma gratuita como Opcodes fixos de leitura no nó local.
- D) Uma vez consolidada, a arquitetura de imutabilidade bloqueia que o contrato inteligente interaja com endereços criados cronologicamente após sua data de deploy.

### Questão 5
Na infraestrutura de segurança e validação de redes descentralizadas, o acesso e a autoria das transações operam pautados na criptografia assimétrica de pares de chaves. Qual das alternativas reflete corretamente as definições teóricas e a relação arquitetural entre chave privada e chave pública?
- [ ] A) A chave privada cifra dados contratuais vitais para mantê-los invisíveis aos nós e exploradores de blocos; e a chave pública decifra os extratos financeiros dentro do *storage* dos nós autorizados de um consórcio.
- [ ] B) A chave privada é o elemento criptográfico mantido em segredo pelo proprietário para assinar transações e atestar que a transferência possui origem legítima. A chave pública serve como um endereço de encaminhamento transparente, utilizado pela EVM e pelos nós para verificar computacionalmente a autenticidade da assinatura digital sem revelar a chave privada que a gerou.
- [ ] C) A chave privada origina e firma o Certificado Digital tradicional atestado por Autoridades Certificadoras (AC) estatais; a chave pública, por sua vez, é custodiada compulsoriamente nas Exchanges Centralizadas (CEX) atrelada ao CPF do investidor.
- [ ] D) A chave pública assina a aprovação atômica dos pagamentos utilizando expressões regulares (Regex), e a chave privada atua como apontador no InterPlanetary File System (IPFS) para o resgate de mídias criptografadas off-chain.

### Questão 6
Na taxonomia das tecnologias de contabilidade distribuída (DLT), as blockchains são catalogadas a depender das suas restrições de visibilidade e controle administrativo. Sob a óptica da governança descentralizada, qual é a definição teórica apropriada que difere uma Blockchain de Consórcio de uma Pública e de uma Privada?
- [ ] A) A Blockchain de Consórcio é uma arquitetura que prescinde de um algoritmo de consenso matemático, sendo homologada apenas por rubricas manuais de auditores independentes, enquanto a rede Pública exige processamento em Opcodes lineares.
- [ ] B) Ela distingue-se por ser uma arquitetura corporativa mantida integralmente pelo servidor de uma única organização de grande porte, convergindo suas operações de bloco a tabelas emuladas num banco relacional isolado.
- [ ] C) Diferindo da Pública (completamente aberta e *permissionless*) e da Privada (comandada e restrita a apenas uma entidade isolada), a rede de Consórcio apresenta nós validadores formados, administrados e regidos por um agrupamento pré-aprovado de múltiplas organizações com interesses em comum, mesclando descentralização restrita com conformidade comercial.
- [ ] D) A rede de Consórcio lida essencialmente com a estrutura topológica baseada em *Directed Acyclic Graph* (DAG), suplantando unicamente a carência de escalabilidade de transações das blockchains privadas abertas.

### Questão 7
Na teoria da execução sistêmica de *Smart Contracts*, aborda-se frequentemente a passagem de uma linguagem de alto nível até a camada que é compreendida e executada pela rede. O que representa teoricamente o Bytecode e os Opcodes no contexto operacional da Máquina Virtual do Ethereum (EVM)?
- [ ] A) O Bytecode é um formato JSON gerado na compilação que interage com a API *window.ethereum* via navegador, orientando a interface de quais Opcodes visuais exibir com atributos HTML.
- [ ] B) O Bytecode é o resultado compilado e empacotado da lógica do Solidity em linguagem hexadecimal binária. Ele é preenchido por Opcodes, que representam as instruções operacionais primárias e atômicas baseadas em pilhas (como `ADD`, `PUSH`, `CALL`) compreendidas e computadas pela EVM perante a dedução de gas.
- [ ] C) Os Opcodes são as bibliotecas escritas em Javascript/TypeScript providas por repositórios como Hardhat que a EVM instala para conseguir traduzir o Bytecode de volta para linguagem humana no *Block Explorer*.
- [ ] D) O Bytecode é o termo designado para identificar unicamente a versão arquitetônica da rede (ex: "Paris" ou "Shanghai") que agrupa a formatação criptográfica baseada em EIP-55 e converte frações em base decimal.

### Questão 8
Em linguagens voltadas a aplicações de DLT (como o Solidity), é vital categorizar teoricamente as funções quanto a sua capacidade de interagir com o armazenamento de estado dos nós, dada a onerosidade e regras de consenso atreladas. Sob essa vertente, como os modificadores de mutabilidade `view` e `pure` se separam estruturalmente?
- [ ] A) Funções designadas como `view` permitem a gravação de alterações irreversíveis se o remetente pagar o correspondente em Wei estipulado na variável global `msg.value`. Já funções `pure` são isentas dessas requisições financeiras e efetuam deleções parciais no banco.
- [ ] B) O modificador `pure` categoriza funções estritamente isoladas, que não acessam nem leem o estado armazenado globalmente e operam só sob as variáveis passadas em seus argumentos; a designação `view`, em contrapartida, garante permissão para a função ler dados armazenados da memória global permanente (*storage*), mas a inibe de efetuar qualquer alteração ou gravação nela.
- [ ] C) O escopo de `pure` define nativamente os métodos direcionados para extrair dados brutos hospedados via hashing fora do servidor, no ecossistema de redes IPFS; `view` abarca leitura restrita às memórias contidas em laços `try-catch` da EVM.
- [ ] D) O `view` atesta metodologias compatíveis com *On-Ramp* em arquiteturas atômicas pagáveis, e `pure` certifica repasses não logados no sistema unicamente em operações da rede simulada Hardhat.

### Questão 9
A padronização das tipagens e da exatidão quantitativa compõe a base matemática sólida das redes Web3. Dentro dos fundamentos teóricos dispostos pelo Solidity, o que definem intrinsecamente o tipo de variável `address` associado ao EIP-55 e a subdivisão monetária `Wei`?
- [ ] A) `address` é a chave privada e anônima atrelada à submissão inicial de contratos na EVM; `Wei` é uma string base64 que identifica o nó validador temporário em ecossistemas de Testnet.
- [ ] B) O `address` é uma string padronizada identificadora de formato numérico decimal oriundo exclusivamente das configurações de contêineres Docker, enquanto o `Wei` representa a fração percentual subtraída na emissão de NFTs de colecionáveis.
- [ ] C) O `address` compreende o identificador estrutural de vinte bytes (conta ou contrato) cujo padrão EIP-55 aplica um mecanismo criptográfico de segurança de letras (checksum sensível a *case*) contra inconsistências digitais. O `Wei` é estabelecido na teoria como a fração mais minuciosa indivisível do Ether ($10^{-18}$), garantindo extrema precisão e evitando perdas falhas de flutuação em micropagamentos a nível de EVM.
- [ ] D) O tipo `address` condensa os identificadores de versão estendidos no Blockchain Explorer, enquanto a designação de um montante fixo em `Wei` aciona uma transferência baseada fundamentalmente no limite geográfico da rede de IP do cliente originador.

### Questão 10
Dois blocos de alocação se destacam ao registrar fatos operacionais na estrutura nativa de uma arquitetura Ethereum: o Estado de Armazenamento Global Permanente (*Storage*) e os Registros nos Logs do Bloco (Eventos / `event`). Como a teoria da EVM diferencia profundamente essas duas formas de arquivamento perante acesso computacional e custos atrelados?
- [ ] A) Eventos armazenam informações mutáveis e contínuas no cache da infraestrutura para que demais contratos da Mainnet possam realizar consultas locais síncronas gratuitamente; o *storage* grava em disco rígido restrito do nó minerador original de forma inacessível para o mundo P2P.
- [ ] B) O *storage* armazena obrigatoriamente ponteiros de chaves públicas interligadas em *off-ramp*, ao passo que os Eventos geram mutabilidade direta do estado manipulando objetos `window.ethereum` no navegador HTML do requisitante.
- [ ] C) O *storage* retém as variáveis que compõem o estado global oficial da máquina Ethereum, cuja escrita custa vastas frações de Gas devido à replicação duradoura e sua permanente disponibilidade de leitura para transações e demais contratos. Os Eventos imprimem ocorrências apenas nos relatórios de logs passivos do bloco de forma imutável e altamente econômica, servindo para históricos e monitoramento visual de *frontend*, mas proibindo que contratos leiam os logs ativamente em tempo de execução interna.
- [ ] D) A alocação de *storage* funciona por meio de encriptações em DAG que limitam as validações do Bitcoin, enquanto as invocações por eventos dependem unicamente das aprovações externas submetidas e indexadas por órgãos judiciários de Autoridades Certificadoras antes da gravação no bloco principal.

<br><br><br><br>

# Gabarito Comentado

<details>
  <summary><b>Ver Resposta da Questão 1</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** O divisor de águas entre Web 2.0 e Web 3.0 encontra-se primordialmente no pilar da descentralização. A Web 2.0 funciona sob os ditames da centralização baseada na confiança delegada a corporações que mantêm o domínio e o banco de dados armazenado em seus próprios servidores em modelo cliente-servidor tradicional. Por contraste formal, a Web 3.0 funda sua distribuição, interatividade e soberania de registro em protocolos de redes par-a-par (P2P), orquestrando o consenso por meio de algoritmos abertos como blockchain.
  * **Erro da Alternativa A:** Ambas arquiteturas utilizam metodologias e padrões de criptografia variados sem que "IP estático" seja fator constituinte da fundação da Web3.
  * **Erro da Alternativa C:** Ao contrário, a Web 3.0 expande consideravelmente as interações rodando algoritmos extremamente avançados via EVM (os Smart Contracts) com capacidades complexas, e não apenas uma visualização imutável passiva e paralisada.
  * **Erro da Alternativa D:** A Web 2.0 não alcança e nem sequer oferece imutabilidade nos seus dados estocados, estando seus registros amplamente sujeitos à vontade unilateral de deleção ou corrupção pontual de um administrador das bases.
</details>

<details>
  <summary><b>Ver Resposta da Questão 2</b></summary>
  
  **Alternativa Correta:** C
  
  * **Justificativa da Correta:** O escopo do "Efeito Avalanche" diz respeito matematicamente ao comportamento do output gerado: qualquer minúscula modificação (uma única quebra de espaço ou de vírgula) inserida na estrutura fonte altera e transfigura completamente toda a composição hash subsequente produzida pela função. Nos encadeamentos da DLT, os Parent Hashes atados com essa propriedade asseguram tecnicamente que alterações retroativas clandestinas num dos blocos gerem hashes avassaladoramente incongruentes, escancarando as fraudes para recusa da malha validadora de forma veloz.
  * **Erro da Alternativa A:** A impossibilidade de reverter e encontrar a origem (força bruta de regressão invertida) denomina-se formalmente Resistência à Pré-Imagem, a qual foca no sigilo, em contraste com a mudança do output focado pelo Efeito Avalanche para proteção de adulterações de conteúdos.
  * **Erro da Alternativa B:** Duas mensagens independentes resultarem ocasionalmente e por acaso do destino no mesmíssimo exato algoritmo gerador configura-se o pior caso chamado na matemática criptográfica de "Vulnerabilidade ou Ataque de Colisão" e não deve estar atrelado ao conceito comportamental intencional do efeito Avalanche em um algoritmo blindado padrão AES/SHA256.
  * **Erro da Alternativa D:** Transformações hash não constituem tecnologias e ferramentas de compressão zipadora focada em salvamento de peso volumétrico de mídias em banco de dados; representam apenas impressões digitais identificadoras unilaterais não descompactáveis.
</details>

<details>
  <summary><b>Ver Resposta da Questão 3</b></summary>
  
  **Alternativa Correta:** A
  
  * **Justificativa da Correta:** Na esfera do PoW, exige-se processamento físico-intensivo de energia e chips sofisticados com a meta de dificultar manipulações da infraestrutura de governança atrelada. Já no escopo reformulado da infraestrutura adotada em PoS, cessa-se essa exaustão ecológica de hardware, convertendo o poder de gerar blocos na posse capital baseada no trancamento garantidor das moedas dos participantes depositados (*stake*) na blockchain oficial de validação em questão.
  * **Erro da Alternativa B:** PoW consolidou e embasou originariamente a máxima total descentralizada (Bitcoin) e não redes exclusivas de consórcios dependentes da confiança cega e mútua de empresas. O PoS opera com nós independentes, sem obrigação imperativa de execução e subordinação de contêineres a entes estritos na Nuvem pública das BigTechs para gerar blocos.
  * **Erro da Alternativa C:** Os dois protocolos foram idealizados originariamente e dedicam-se frontalmente para impossibilitar as artimanhas focadas nos roubos provenientes de vetores como de Gasto Duplo em transacionamentos.
  * **Erro da Alternativa D:** Transferir soberanamente as chaves privativas da carteira pessoal que controla a validação e stake a uma instituição central única refutaria diametralmente toda as pilastras teóricas da base descentralizada e não figura na documentação original de um protocolo PoS nativo da fundação Ethereum.
</details>

<details>
  <summary><b>Ver Resposta da Questão 4</b></summary>
  
  **Alternativa Correta:** A
  
  * **Justificativa da Correta:** A implantação de um Smart Contract sela-o como entidade definitiva no livro-razão cronológico e persistente de um bloco; seu repositório de bytecode (sua essência matemática compilada e enviada via deploy) exaure as condições diretas para sofrer sobrescritas no lugar por qualquer agente de rede — seja ele seu programador fundador, nó validador ou governo civil. Portanto, códigos lógicos falhos continuarão a operar defeituosamente perante a execução das solicitações, impedindo edições simples de refatoração nos moldes que bancos Web 2 operariam na manutenção.
  * **Erro da Alternativa B:** Taxas da plataforma sistêmica ou flutuações e métricas do mercado e gas são ditados por variáveis do congestionamento atual e precificações externas do pool; e independentes do arcabouço estrutural do código imutável do programador em análise estática.
  * **Erro da Alternativa C:** Interagir com execuções na Mainnet requer pagamento obrigatório, mesmo para bytecode de métodos antigos que consumem cálculos intrínsecos processados computacionalmente nas fileiras de pilhas Opcodes validados pela rede de forma irremediável.
  * **Erro da Alternativa D:** Contratos podem se comunicar organicamente interagindo rotineiramente com outros instanciados após ele na cronologia global de deploy (desde que suas funções interativas tenham as portas flexíveis declaradas, como no uso de `address`), caso contrário seriam cegos operacionais e inúteis sistemicamente na expansão em cadeia dos blocos contínuos.
</details>

<details>
  <summary><b>Ver Resposta da Questão 5</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** Na formulação dos fundamentos em curva elíptica para P2P, a Chave Privada assume o encargo autêntico de conceder autorização sob seus saldos. Ela nunca deixa o escopo do remetente e gera uma sinete matemática para a requisição. Do outro lado da equação teórica, a Chave Pública figura como um componente transparente — muitas vezes exposto formatado em Endereço derivado de carteiras — provendo para as máquinas mineradoras as matrizes necessárias visando testar o *checksum* assinado e aprovar a integridade inquestionável do elo de assinatura sem ter que ler os caracteres da Chave Privada do dono da aprovação na checagem final criptográfica da EVM.
  * **Erro da Alternativa A:** Nenhum conteúdo monetário e descritor global nas transações padrões das blockchains clássicas encontram-se cifrados aos olhos analíticos dos validadores de forma embutida e lacrada das varreduras nativas (pseudo-anonimato público do Explorer).
  * **Erro da Alternativa C:** Chaves de carteira independentes da Web 3.0 não decorrem da burocracia documental cartorial, e não são emitidas obrigatoriamente acopladas ao recolhimento central governamental com CPF e KYC atestando o indivíduo humano.
  * **Erro da Alternativa D:** A funcionalidade de realizar as assinaturas da aprovação executiva financeira pertence exclusivamente apenas à instância Privada; não cabe computacionalmente na sintaxe e modelo criptográfico da instância Pública processar as gerações originais da Assinatura final da requisição na camada do usuário.
</details>

<details>
  <summary><b>Ver Resposta da Questão 6</b></summary>
  
  **Alternativa Correta:** C
  
  * **Justificativa da Correta:** Teorizando as instâncias das arquiteturas DLTs, Redes Públicas são universais ao mundo; Redes Privadas isolam os trâmites ao crivo e veredicto ditatorial de apenas um ente único de controle; a rede de Consórcio abarca o intermédio entre ambos. O seu espectro de governança teórica partilha os nós processadores entre participantes previamente identificados, avaliados, escolhidos e engajados comercialmente em bloco — unindo confiança recíproca restrita aos entes convidados e preservação das informações corporativas fora das plataformas gratuitas e indiscretas globais.
  * **Erro da Alternativa A:** Qualquer blockchain fundamental exige a existência operacional implacável de um motor e de consensos matemáticos entre nós para existir enquanto arquitetura sistêmica funcional DLT, sem limitar a rubrica de indivíduos corporativos de escritórios estatais de forma passiva nas verificações digitais por fora do bloco validador interno na checagem de transações corporativas.
  * **Erro da Alternativa B:** Ao deter servidores unicamente por parte isolada na empresa, o formato enquadra-se irrestritamente apenas e tão somente no estrito título de Banco ou de rede Blockchain em formato Privado fechada em si mesmo, desqualificando-se teórica e perfeitamente da classificação formal cooperada corporativa no conceito do ecossistema de Consórcios regrados que demandem duas ou mais partes corporativas nas operações unificadas do consenso.
  * **Erro da Alternativa D:** Formatos topológicos e fluxogramas matemáticos do processamento linear via grafos DAG tratam puramente da otimização arquitetural para fluxos massivos operacionais focados em superar TPS. O formato DAG não serve por si próprio para classificar ou ditar restrições em quem acede ou valida os blocos, não abarcando o limite teórico descritivo do que difere o acesso formal entre Públicas ou Consórcios operando com a arquitetura topológica de forma restritiva no papel central de gestão do consenso em redes.
</details>

<details>
  <summary><b>Ver Resposta da Questão 7</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** Por definição arquitetural, a Máquina Virtual do Ethereum executa o contrato num modelo conceitual de pilha. Quando programamos, por exemplo, o Solidity, um compilador atua como intermédio traduzindo as variáveis abstratas legíveis do dev humano em Bytecode (hexadecimal compacto). O Bytecode na realidade congrega ordens unitárias intrínsecas e rígidas de máquina chamadas Opcodes — cada uma englobando o trabalho de carregar valores na memória, empilhar e calcular, e cada unidade subtrairá um valor na equação correspondente exata de cálculo taxativo do "gas" predeterminado do protocolo originário do sistema em execução.
  * **Erro da Alternativa A:** A EVM não entende o alto-nível; sem compilação local (ou cloud) formativa prévia ao deploy, nem navegador e nem a Blockchain entenderiam sintaxe textual bruta via Opcodes visuais estáticos puramente.
  * **Erro da Alternativa C:** Os nós mineradores não usam e nem convertem código de produção compilado em pacotes contendo simples e legíveis formatados Regex de forma que o protocolo descentralizado externo do IPFS auxilie milagrosamente barateamento da escalabilidade ou cômputos diretos em contratos abertos rodando na execução interna das matrizes em validações EVM ativas diretas e atreladas nos nós que devem checar execuções das transações ao rodar e analisar operações matemáticas na infraestrutura do núcleo principal validando o processamento transacional diário no código inteligente submetido à execução via chamada JSON externa originada de transações normais em bloco consolidado da rede principal de consenso no ambiente local do terminal originário ou nó ativo no consenso.
  * **Erro da Alternativa D:** O Bytecode traduz estritamente instruções computacionais primitivas das declarações; não se enquadra na designação textual estrita das formatações de endereço nem das subdivisões fiduciárias. Os hard forks ("Paris") configuram agrupamentos temporais de especificações e introduções pontuais nas regras estruturantes da EVM que passam a valer nos interpretadores de bytecode da rede desde aquela altura do bloco cronometrado global para introduzir novas ferramentas à máquina principal atualizada em produção.
</details>

<details>
  <summary><b>Ver Resposta da Questão 8</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** O modificador `view` atesta estaticamente aos componentes sistêmicos da EVM que as invocações declaradas naquele escopo irão acessar, carregar e transcrever parâmetros contidos nativamente e guardados a longo prazo nas camadas do *storage* dos nós e blocos. No extremo rigor, o identificador `pure` desautoriza severamente não apenas que se manipule os conteúdos contidos lá na edição final de gravação do protocolo, como ele proíbe enfática e categoricamente qualquer menção a ler qualquer campo estocado nos endereços dos dados da cadeia dos blocos originais gravados nos blocos prévios históricos do estado durável da máquina que rodam nas compilações gerenciais de memória profunda local persistidas após o processo estrito finalizador da finalização no estado em registro global e histórico do contrato inteligente no armazenamento consolidado do EVM no estado de máquina e ambiente central.
  * **Erro da Alternativa A:** Uma atribuição visualizadora não comporta, por premissa inicial de projeto de linguagem, alteração definitiva no repositório final perante pagamento ou recebimento fiduciário associado no escopo final local da blockchain principal, sendo as funções e modificadores de "payable" responsáveis fundamentais pelo tráfego de recebimento para o escopo e de escritas finais. Funções com visibilidade e atribuição em `pure` jamais realizam gravações de modificações exclusivas que afetem o balanço total e nem executam "deleções" ativas e destrutivas em banco e em nenhum de seus vetores nas chamadas processuais do modelo estrito.
  * **Erro da Alternativa C:** Os atributos tratam puramente da acessibilidade e segurança teórica da manipulação computacional frente às variáveis da abstração dos contratos no contexto fechado do nó local da EVM e de modo orgânico nativo. Nenhum método do contrato Solidity foi teorizado no seu núcleo inicial base arquitetural para apontamentos exógenos exclusivos e consultas dinâmicas de leituras remotas forçadas acessando ecossistemas descentralizados da infraestrutura do arquivo remoto paralelo armazenado em repositórios P2P de forma autônoma pelo compilador no nível básico central dos métodos imutáveis originários.
  * **Erro da Alternativa D:** A teoria que abarca o escopo modificador independe das arquiteturas centralizadas limitadas como "On-Ramp". Operações matemáticas simples sem leitura operam da mesma e idêntica restritiva forma rigorosa nas diretrizes de rede pública principal e central com os cálculos computacionais internos locais das abstrações de funções contidas no código.
</details>

<details>
  <summary><b>Ver Resposta da Questão 9</b></summary>
  
  **Alternativa Correta:** C
  
  * **Justificativa da Correta:** A especificação em `address` encapsula fundamentalmente a base atômica que dita identidades de recepção na Ethereum; a sua associação unificada em conformidade legal com a Proposta de Implantação EIP-55 trouxe uma camada verificadora imperativa de formato contra erro humano baseada na alteração algorítmica exata das sentenças de minúsculas ou maiúsculas orientada num hash, salvaguardando a digitação humana nas transmissões visuais ou cópias errôneas sem custar processamento de rede. A representação de grandezas operacionais submete-se invariavelmente, por baixo das interfaces e nos pagamentos de frações dos *gas prices* internos cobrados pela manipulação na EVM, baseando-se estrita e inteiramente na menor fatia universal divisível de precisão integral de cálculo decimal do ativo que reside e denomina-se fixo e conhecido matematicamente pelo escopo global da comunidade central e código como `Wei` na sua proporção padronizada sem ponto flutuante em código binário.
  * **Erro da Alternativa A:** Nenhum componente referenciado como chave atua abertamente via anonimato de uso nas formatações estritamente abertas identificadoras atreladas à tipagem local nos endereçamentos dos scripts submetidos à checagem pública dos nós atrelados à validação de rede final da blockchain no processamento atrelado do ambiente e visualizados perante os blocos de estado contendo registros claros identificadores em EVM local e testnets não sendo os `Weis` moedas de Testes puramente educacionais desassociadas ou tokens apartados da rede da Mainnet. Eles compõem inteiramente todos os cálculos fiduciários ativos da Mainnet produtiva primária valiosa e fundamental na mesma medida matemática.
  * **Erro da Alternativa B:** Não há estrita dependência em contêiner Docker para ditar a formulação ou formato originário atrelado do objeto ou tipos nativos associados, originando-se do próprio framework básico da linguagem da Web3 central da EVM. O padrão associado com fracionamento percentual sobre emissões monetárias deduzidas ao fim nos NFTs e negociações relativas a taxas recaem puramente sobre algoritmos comerciais customizados que utilizam Weí, sem ditar a essência formadora elementar do que a subunidade representa e conceitua.
  * **Erro da Alternativa D:** A tipagem abstrata originária com base nas normativas implementadas e ativas associadas independe ativamente das numerações instaladas via versões puras dos exploradores descentralizados externos operantes do sistema que indexam, bem como não possuindo a subunidade essencial ligação orgânica imperativa ao rastreamento impeditivo associado limitante puramente do geoposicionamento geográfico de clientes IPs.
</details>

<details>
  <summary><b>Ver Resposta da Questão 10</b></summary>
  
  **Alternativa Correta:** C
  
  * **Justificativa da Correta:** O *Storage* de um smart contract reflete o mapeamento físico vital que persiste a memória profunda imutável a longo prazo em absolutamente cada um dos computadores globais que processam o protocolo. Gravar neste local onera e tributa rigorosamente as requisições, porém garante ao componente que outros contratos acessem as referidas posições e atestem atualidade em rotinas síncronas de execução no momento de submeter modificações globais na base validadora da rede. Em via alternativa econômica da teoria de salvamento na DLT, a submissão dos Eventos produzirá marcas fáceis atreladas estruturadas de forma fixa, anexadas nas folhas dos cadernos históricos formativos dos relatórios de transação concluída de um bloco processado com baixo consumo gas do solicitador, os quais podem ser indexados pelas janelas visuais e por interfaces externas que acompanham os resultados assíncronos das transações via provedores web e aplicativos frontends (RPC/WebSocket APIs) mas sem prover as informações e permitir resgate na checagem nativa computacional durante rodadas síncronas ativas executando validação interna cruzada das dependências exigidas aos nós em contratos de forma inteligente no código atrelado.
  * **Erro da Alternativa A:** Eventos não ocupam por definição a base restrita e volátil mutável, servindo inteiramente para preencher os cadernos definitivos fixos de impressão passivos do log histórico fechado e blindado das faturas originais na cadeia e proibindo por natureza que Smart Contracts da mesma fileira rodem suas checagens lendo dados extraídos das matrizes passadas geradas nesse evento nos fluxos abertos ou atrelados nas validações da mesma transação paralela ativa via intermédios locais diretos com outras rotinas no código.
  * **Erro da Alternativa B:** O estado permanente formador não aloca nem processa pontes para chaves baseadas estruturalmente ligadas em IPFS em sua premissa elementar imutável padrão, servindo no contexto puro apenas de array hexadecimal binário custoso local ativo para armazenar e extrair qualquer dado ou tipagem declarados sem intermediário. Eventos não manipulam e nem se associam à árvore DOM do cliente remoto de forma mecânica gerencial nem modificadora originada pela transação de gravação de forma ativa pelo processador de forma descentralizada pelo navegador local das aplicações no ambiente JavaScript ou das interfaces com instanciamento central e ativo na chamada do browser de conexão nativa de terceiros sem manipulações customizadas em bibliotecas auxiliares ativas.
  * **Erro da Alternativa D:** Tipologias gráficas ou de vetores acíclicos não ditam a limitação restrita das funções essenciais estritamente da EVM formadora originária das diretrizes da formatação das cadeias primárias ativas estruturantes e restritivas dos vetores processuais de Ethereum, além de registros imutáveis formatados nativos via operações internas isentarem puramente qualquer burocracia de validação oficial de despachos e de chancelas oficiais por cartórios corporativos centrais estatais alocados passivamente fora da infraestrutura da blockchain validada puramente da matemática intrínseca criptográfica do nó executante das regras internas padronizadas pela EIP ativa em consenso no bloco consolidado pela mineração distribuída por prova P2P descentralizada e inalienável sem checagem de governo nas etapas validadoras pré gravação.
</details>
