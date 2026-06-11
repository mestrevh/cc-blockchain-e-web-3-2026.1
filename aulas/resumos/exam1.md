# Simulado Final: Blockchain e Web 3.0 (Nível Difícil / ENADE)

Este simulado foi desenvolvido para testar a sua compreensão teórica e prática sobre arquiteturas descentralizadas, criptografia, consenso e o desenvolvimento prático no ecossistema Web 3.0.

---

### Questão 1
Uma instituição de saúde deseja migrar seus prontuários médicos de um banco de dados centralizado (Web 2.0) para uma arquitetura descentralizada (Web 3.0). O principal objetivo é garantir a integridade forense dos dados e evitar fraudes por alterações retroativas no histórico dos pacientes. Considerando os princípios matemáticos e estruturais de uma rede blockchain, qual o mecanismo exato que garante essa proteção contra reescrita do histórico?
- [ ] A) A rede armazena cópias simétricas em servidores P2P, garantindo que a exclusão física de um registro (CRUD Delete) em um nó não afete os demais servidores da instituição.
- [ ] B) A imutabilidade é assegurada pela propriedade do "efeito avalanche" na função hash; como o cabeçalho de cada bloco contém o Hash do Bloco Anterior (Parent Hash), qualquer adulteração isolada altera a assinatura do bloco, quebrando a sequência lógica e sendo rejeitada pelo consenso da rede.
- [ ] C) Os prontuários são validados através do mecanismo de Proof of Work (PoW), o que significa que o alto consumo energético impede matematicamente que invasores acessem os nós validadores da rede interna corporativa.
- [ ] D) A segurança baseia-se na custódia centralizada das chaves privadas pela própria instituição, permitindo que apenas administradores autorizados utilizem contratos inteligentes para sobrescrever e corrigir os dados passados em blocos anteriores.

### Questão 2
Durante a concepção arquitetural de uma nova rede de pagamentos distribuída, a equipe de engenharia debate a transição do modelo de consenso *Proof of Work* (PoW) para *Proof of Stake* (PoS). Em paralelo, discute-se o ciclo de vida dos *Smart Contracts* que processarão a lógica de negócio na EVM (Ethereum Virtual Machine). Sobre a relação entre os modelos de consenso, custo computacional e a execução de contratos inteligentes, assinale a alternativa correta:
- [ ] A) No modelo PoS, a segurança da rede é baseada na capacidade de processamento dos mineradores, reduzindo os custos de "Gas" e permitindo atualizações contínuas no código-fonte dos Smart Contracts sem gerar novas taxas de rede.
- [ ] B) Se um Smart Contract implantado contiver um bug lógico, os desenvolvedores podem realizar uma transação de reversão administrativa para editar o código-fonte original já consolidado na blockchain, garantindo a correção independentemente do consenso utilizado.
- [ ] C) Uma transação que invoque um Smart Contract construído com um laço infinito causará o travamento sistêmico de todos os nós da EVM, exigindo a intervenção de uma autoridade certificadora para resetar o bloco em andamento.
- [ ] D) O modelo PoS mitiga o custo ecológico do PoW substituindo a força computacional pelo bloqueio financeiro (stake) dos validadores. Além disso, falhas lógicas em Smart Contracts são críticas devido à sua imutabilidade nativa; no caso de um laço infinito, a EVM não trava, mas consome toda a taxa (Gas) providenciada pelo usuário até reverter a transação por falta de fundos.

### Questão 3
Em uma auditoria de segurança de uma carteira digital corporativa, identificou-se a seguinte vulnerabilidade crítica: um invasor interceptou o pacote de uma assinatura válida de transferência de fundos na blockchain pública e o retransmitiu repetidas vezes, esgotando o saldo da vítima com transações duplicadas idênticas. Esse cenário descreve um *Replay Attack* (Ataque de Reprodução). Qual é a principal contramedida estrutural implementada na montagem de transações em redes blockchain para evitar que esse ataque seja bem-sucedido?
- [ ] A) A emissão obrigatória de um Certificado Digital provido por uma Autoridade Certificadora central (ex: governo) a cada nova transação iniciada.
- [ ] B) A ofuscação da chave pública do remetente nas transações, impedindo que o invasor identifique qual carteira possui os fundos disponíveis.
- [ ] C) A inserção de um componente temporal nativo (Timestamp) ou um número sequencial único (Nonce) no corpo da transação original antes da sua assinatura criptográfica, tornando qualquer cópia integral do pacote obsoleta perante a rede.
- [ ] D) A utilização exclusiva da árvore de *Merkle Root* para empacotar múltiplas transações simultâneas de modo que a assinatura seja validada através de criptografia simétrica.

### Questão 4
O conceito basilar do ecossistema de criptoativos é resumido na máxima *"Not your keys, not your coins"*. Um investidor institucional decidiu armazenar todo o patrimônio da sua empresa em uma corretora centralizada (CEX) para facilitar o processo de entrada financeira (*On-Ramp*). Meses depois, a corretora declarou falência após hackers roubarem as chaves de seus servidores em nuvem. Com base na arquitetura de criptografia assimétrica e custódia de carteiras descentralizadas, por que a recuperação judicial ou técnica desses fundos se torna inviável para o investidor?
- [ ] A) Porque as transações na blockchain são autorizadas exclusivamente pela chave privada correspondente àquele endereço. Como o investidor delegou a posse de suas chaves para a corretora (custódia), o invasor utilizou essas chaves reais para assinar transferências legítimas perante a rede descentralizada, a qual é estruturalmente incapaz de reverter operações ou confiscar saldos consolidados.
- [ ] B) Porque a chave pública do investidor estava armazenada em um diretório temporário do servidor (`/tmp`), apagando o rastro criptográfico da blockchain assim que o servidor da corretora CEX foi reiniciado durante a invasão.
- [ ] C) Porque as corretoras centralizadas operam essencialmente em ambientes de *Testnet* (como a Sepolia) por segurança; uma vez hackeados, esses ativos fictícios não possuem respaldo ou ponte de repatriação para a *Mainnet*.
- [ ] D) Porque o ataque exigiu que o hacker invadisse e alterasse simultaneamente o registro de mais de 51% dos nós P2P mundiais da rede Bitcoin, inviabilizando qualquer resposta da Autoridade Certificadora.

### Questão 5
Um grande consórcio internacional do ramo petrolífero deseja construir um sistema distribuído para auditar e rastrear as emissões de carbono e transferências de gás natural de toda a cadeia de produção. As empresas envolvidas concorrem entre si e, portanto, não confiam plenamente umas nas outras para hospedar um servidor centralizado que concentre o banco de dados. Ademais, necessitam de privacidade em dados contratuais (que não devem ser expostos na internet aberta) e altíssima vazão transacional (throughput). Com base na taxonomia das redes e em suas escalabilidades, qual arquitetura atende satisfatoriamente essas demandas conflitantes?
- [ ] A) O uso de um banco de dados tradicional relacional (SQL) com interface web interativa de controle CRUD total (criação, leitura, atualização e exclusão), mantido e auditado exclusivamente pelo maior conglomerado do grupo.
- [ ] B) A implementação de uma Blockchain Pública e permissionless nativa (como o Bitcoin em modelo Proof of Work), cuja serialização sequencial de blocos provê a velocidade e escalabilidade de TPS exigidas pelas petroleiras, ainda que sacrifique sua transparência industrial para o mundo.
- [ ] C) Uma arquitetura de Blockchain de Consórcio ou Híbrida (como Redes baseadas em DAG - Directed Acyclic Graph - a exemplo da Hedera Hashgraph), permitindo a governança compartilhada dos nós validadores em ambiente restrito, garantindo segurança matemática mútua, sem expor os dados corporativos em redes públicas e operando em fluxos paralelos para maximizar o TPS.
- [ ] D) O uso extensivo de carteiras MetaMask em ambiente local através do nó simulado provido pelo Hardhat, assegurando que o *Chain ID* isole o rastreio global e mantenha todo o banco de dados temporariamente contido no IPFS de forma simétrica.

### Questão 6
O uso de tecnologias de contabilidade distribuída (DLT) não é aplicável a todo e qualquer problema de software. O chamado "Dilema de Escolha" impõe regras de seleção e as implementações devem atentar ao ordenamento jurídico internacional. Com base nos limites técnicos da blockchain e suas intersecções com normativas como a LGPD (Lei Geral de Proteção de Dados) e GDPR europeia, marque a afirmação correta a respeito dessas restrições:
- [ ] A) A adequação de blockchains públicas às leis de privacidade europeias exige que os validadores transicionem seus Opcodes para a versão "Paris", permitindo operações de CRUD (Update e Delete) em funções com o modificador *pure*.
- [ ] B) A arquitetura da blockchain não permite a exclusão física (deleção) de um registro, processando correções unicamente por meio de novas transações de compensação retroativa. Essa perpetuidade sistêmica entra em confronto jurídico irresolvível com o princípio fundamental do "direito ao esquecimento" garantido tanto pela LGPD quanto pela GDPR.
- [ ] C) Normativas de privacidade requerem que o carimbo temporal (Timestamp) dos blocos seja substituído pela coleta do endereço de IP real e validação de documento dos usuários (KYC) como metadados criptográficos abertos.
- [ ] D) O uso de Blockchain justifica-se apenas quando uma única entidade confiável e transparente decide disponibilizar unilateralmente o registro em modo "somente leitura" aos seus parceiros na Web 2.0, alinhando-se aos ditames da LGPD sem atritos.

### Questão 7
O desenvolvimento de um novo protocolo descentralizado exige testes rigorosos e compreensão fundamental de seus ambientes operacionais, bem como a transição entre diferentes moedas e a economia tradicional. Durante a concepção técnica dessa arquitetura, como devem ser tipificados e aplicados os conceitos de Redes de Teste, DEX, CEX e categorias de ativos criptográficos?
- [ ] A) A rede de testes (*Testnet*) compartilha fisicamente os mesmos nós validadores da rede principal (*Mainnet*), alterando apenas a variável lógica do Chain ID para barrar a transferência não-intencional de ativos entre elas.
- [ ] B) Corretoras Descentralizadas (DEX) gerenciam ordens de troca retendo a custódia temporária das carteiras de seus clientes em bancos de dados SQL para garantir o tráfego veloz via Off-Ramp.
- [ ] C) Os *Tokens* são estritamente os ativos intrínsecos e fundamentais da rede Ethereum (como o Ether), ao passo que a nomenclatura *Coin* (Moeda) reserva-se aos ativos arbitrários criados em cima dela através de contratos inteligentes.
- [ ] D) A transição de ativos do sistema fiduciário para a blockchain é chamada de *On-Ramp*, processo usualmente viabilizado por Exchanges Centralizadas (CEX). Na rede, criações personalizadas de contratos inteligentes configuram *Tokens*, que exigem as Moedas Nativas (Coins) da respectiva rede para quitar a taxa de gas (processamento) e assinar a operação via corretoras descentralizadas (DEX).

### Questão 8
Ao montar o seu laboratório local de desenvolvimento Web3, um engenheiro ativou o framework simulador de rede com o comando `npx hardhat node`. Em sua IDE VS Code, o console de depuração foi atrelado ao navegador por meio do parâmetro `--remote-debugging-port=9222`. Logo após, importou a "Account #0" listada no seu terminal (gerada pelo simulador) preenchendo as configurações da rede na carteira MetaMask. Considerando essa operação de integração na máquina do desenvolvedor, qual a importância criptográfica fundamental da definição exata do Chain ID (`31337`) fornecida na janela da rede local?
- [ ] A) O Chain ID opera como a porta lógica TCP substituta na ausência da depuração remota do Google Chrome, viabilizando o fluxo em JSON-RPC.
- [ ] B) O Chain ID atua como um carimbo matemático único associado às assinaturas digitais da carteira, certificando que a transação destina-se e é válida exclusivamente naquela rede local do Hardhat. Esse mecanismo blindado afasta completamente os perigos de ataques de interceptação onde uma operação feita para uma Testnet pudesse ser repetida com fundos válidos na rede Mainnet (Replay Attack cruzado de redes).
- [ ] C) O número define o tamanho em bits da Chave Privada extraída a partir da *Secret Recovery Phrase* da carteira, garantindo o limite estático de 10.000 ETH por testnet.
- [ ] D) A ausência ou a parametrização de um Chain ID incorreto converte a transação submetida em uma operação gratuita do tipo `eth_call`, não realizando mudanças de estado na blockchain simulada.

### Questão 9
A automação da experiência do usuário no front-end de um DApp (Aplicativo Descentralizado) freqüentemente exige a comunicação programática com as carteiras instaladas no navegador do cliente (ex: MetaMask). Numa de suas funcionalidades em JavaScript, ocorre o acionamento sequencial dos métodos `wallet_switchEthereumChain` e `wallet_addEthereumChain` sob uma estrutura `try-catch`. Sobre esse padrão de interoperabilidade utilizando o protocolo JSON-RPC e a API `window.ethereum`, assinale a afirmativa correta:
- [ ] A) O fluxo baseia-se numa requisição que primeiramente solicita à MetaMask a transferência do usuário para a rede correta utilizando valores decimais no identificador, revertendo para o cadastro de rede se a conversão do Chain ID na EVM falhar.
- [ ] B) O objeto global `window.ethereum` fornece métodos diretos de interface que evitam o uso do protocolo RPC, atuando exclusivamente via *query parameters* interceptados pelo DOM na tag oculta com atributo `hidden`.
- [ ] C) O padrão JSON-RPC exige que valores de rede, como o Chain ID (ex: 31337 local do Hardhat), sejam processados em formato estritamente hexadecimal (como `0x7a69`). O uso do `try-catch` garante que, se a rede for requisitada na troca (`switch`) e não estiver previamente cadastrada no perfil local do Chrome (acionando um erro de status 4902), o código ativará um segundo modal sugerindo o cadastro automático (`add`) dos metadados da nova rede.
- [ ] D) O salvamento das carteiras na pasta temporária do servidor via flag `--user-data-dir=/tmp` garante que essas permissões de requisição de adição de redes sejam reestabelecidas organicamente a cada carregamento limpo do navegador (Live Reload do Browser-Sync).

### Questão 10
Na engenharia de software da Web3, as abordagens de armazenamento de dados brutos e o entendimento da arquitetura de compilação da *Ethereum Virtual Machine* (EVM) impactam imensamente os custos corporativos da aplicação. Avaliando os processos do compilador Solidity, os custos atrelados ao estado global, e as propostas de hospedagem descentralizada, qual o design recomendado para implantar contratos complexos contendo funções de leitura interativas e salvaguarda de mídias pesadas (como contratos PDF indexados em um NFT)?
- [ ] A) O código fonte Solidity deve manter PDFs traduzidos em texto plano (Base64) em suas próprias variáveis locais para simplificar o consumo via Opcodes nativos da versão "Paris" da EVM, sem demandar consultas externas a outras redes.
- [ ] B) O armazenamento nativo de grandes volumes na cadeia gera altíssimos encargos operacionais devido à onerosidade da replicação por todos os nós validadores. A melhor arquitetura integra um sistema descentralizado (P2P), como o protocolo IPFS, armazenando a mídia bruta externamente e persistindo apenas a referência (hash criptográfico leve) no estado do contrato inteligente. Paralelamente, dados não alterados e que servem apenas para leitura são mapeados com o modificador `pure`, os quais não necessitam gerar blocos de registro local via Opcodes `SSTORE` ou gerar taxas de gas, processando-se gratuitamente em chamadas `eth_call`.
- [ ] C) A execução rotineira de funções `pure` consome frações nominais de Gas, pois o *Bytecode* acionado processa os dados de leitura em todos os validadores da rede para atestar sua veracidade; por conseguinte, armazenar referências de hash do IPFS seria igualmente oneroso.
- [ ] D) Para que o Contract Address obtido no processo de Deploy retorne uma leitura gratuita, a função de resgate da string (ex: `unicode"🚀"`) necessita pagar a tarifa imposta pela versão da EVM-Alvo em tempo de compilação.

<br><br>

# Gabarito Comentado

<details>
  <summary><b>Ver Resposta da Questão 1</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** A blockchain utiliza propriedades das funções hash (como o tamanho fixo, unidirecionalidade e, crucialmente, o Efeito Avalanche). Como o bloco N+1 consolida e aponta no seu cabeçalho para o Parent Hash do Bloco N, modificar qualquer registro médico pretérito mudaria a assinatura do bloco, quebrando irremediavelmente a sequência para frente. A rede distribuída de nós validadores recusa imediatamente blocos inconsistentes.
  * **Erro da Alternativa A:** A exclusão física (Delete) é uma operação inexistente na infraestrutura da blockchain.
  * **Erro da Alternativa C:** O alto consumo energético (PoW) resolve o problema de liderança na mineração e gastos duplos, mas a propriedade intrínseca que impede alterações retroativas em dados passados é a construção vinculada das funções Hash na formação dos blocos.
  * **Erro da Alternativa D:** A blockchain rejeita a centralização administrativa. Nem o emissor original tem a capacidade de sobrescrever e "corrigir" fisicamente um registro sem que isso envolva transacionar uma nova operação que compense o histórico, mantendo rastros passados invioláveis.
</details>

<details>
  <summary><b>Ver Resposta da Questão 2</b></summary>
  
  **Alternativa Correta:** D
  
  * **Justificativa da Correta:** Diferentemente do consumo intenso de maquinário do PoW, o consenso de Prova de Participação (Proof of Stake) define as responsabilidades baseando-se no colateral financeiro travado pelos nós validadores (Stake), minimizando custos energéticos. Adicionalmente, quando um código rodando na EVM entra num laço infinito (looping), ele gasta paulatinamente a taxa limitante (gas fee) reservada na transação. Ao exaurir os fundos, ocorre uma reversão ("revert"), assegurando que a rede não paralise.
  * **Erro da Alternativa A:** PoS não usa processamento brutal/hardware intenso para definir a liderança. Além disso, smart contracts não podem sofrer atualizações contínuas em seus códigos fonte originais sem processos externos de re-implantação.
  * **Erro da Alternativa B:** Não se pode fazer uma transação de edição para alterar o código binário (Bytecode) de um contrato já consolidado.
  * **Erro da Alternativa C:** Laços infinitos na EVM não geram travamento sistêmico de múltiplos nós que necessitem de hard resets; esse exato problema foi contornado inteligentemente com a criação e tarifação do combustível computacional (gas).
</details>

<details>
  <summary><b>Ver Resposta da Questão 3</b></summary>
  
  **Alternativa Correta:** C
  
  * **Justificativa da Correta:** O *Replay Attack* é contornado adicionando-se parâmetros dinâmicos à transação (que a diferenciem de suas cópias exatas) prévios à criptografia e autorização. Um número sequencial (*Nonce*) assegura que cada pacote de assinatura na rede é completamente único e de uso exclusivo. Quando a rede contabiliza a primeira execução válida contendo o *Nonce* "X", rejeita cópias com o idêntico conteúdo.
  * **Erro da Alternativa A:** A Web 3.0 opera independentemente de Autoridades Certificadoras centralizadas.
  * **Erro da Alternativa B:** Endereços de carteira não são ocultos nas transações padrão, o pseudo-anonimato exibe abertamente o endereço público.
  * **Erro da Alternativa D:** A Merkle Root sumariza os hashes das transações validadas em um bloco para garantir a integridade interna do bloco, não prevenindo o roubo individual de assinaturas duplicadas na transmissão P2P.
</details>

<details>
  <summary><b>Ver Resposta da Questão 4</b></summary>
  
  **Alternativa Correta:** A
  
  * **Justificativa da Correta:** O preceito "Not your keys, not your coins" alerta que Exchanges atuam como custodiantes totais — o usuário abdica de chaves privadas em troca de liquidez. Com o vazamento, a propriedade criptográfica passou ao invasor. As assinaturas submetidas pelo invasor detentor da chave privada representam transações inquestionavelmente legítimas matematicamente e impossíveis de estorno pela rede descentralizada.
  * **Erro da Alternativa B:** Pastas temporárias e perfis configuram problemas de configuração de ambiente de desenvolvimento local, não estão atrelados ao vazamento de chaves em servidores de nuvem de corretoras CEX.
  * **Erro da Alternativa C:** Corretoras centralizadas operam depósitos com valor e dinheiro real diretamente nas redes *Mainnet*.
  * **Erro da Alternativa D:** A invasão a uma CEX não requer um "Ataque de 51%" contra a rede global. O hacker apenas rouba as Chaves Privadas isoladas que estavam na custódia de um servidor da corretora.
</details>

<details>
  <summary><b>Ver Resposta da Questão 5</b></summary>
  
  **Alternativa Correta:** C
  
  * **Justificativa da Correta:** O cenário demanda a manutenção da descentralização parcial sem perder performance comercial e privacidade. Blockchains de Consórcio reúnem os benefícios da distribuição criptográfica estendendo controle dos nós aos envolvidos, mantendo isolamento da internet aberta. Tecnologias como DAG (Hedera) operam sem as filas de bloco estritas, garantindo paralelismo e TPS superior a dez mil.
  * **Erro da Alternativa A:** Como os membros são concorrentes diretos, eles não concordariam em delegar o poder absoluto CRUD a uma única corporação líder do consórcio.
  * **Erro da Alternativa B:** Redes abertas públicas permissionless (como Bitcoin PoW) sofrem limitação drástica de vazão (cerca de 7 TPS) e exporiam os contratos industriais de forma indiscriminada.
  * **Erro da Alternativa D:** O Hardhat com a MetaMask é um ambiente temporário estrito de teste/simulação em localhost e não se adequa à arquitetura robusta para corporações em produção.
</details>

<details>
  <summary><b>Ver Resposta da Questão 6</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** O projeto tecnológico das Blockchains fundamenta-se na permanente consolidação cronológica de registros (imutabilidade). Este engessamento matemático impede exclusões (Delete), violando o chamado "Direito ao Esquecimento" instituído na lei europeia GDPR e na LGPD brasileira, que permitem aos usuários a eliminação integral de seus dados das plataformas.
  * **Erro da Alternativa A:** Opcodes introduzidos na versão "Paris" (The Merge) relacionam-se ao consenso da rede e execução da EVM, sem capacidade para habilitar exclusões ou reescritas retroativas baseadas em decisões de tribunais em funções `pure`.
  * **Erro da Alternativa C:** O carimbo temporal (Timestamp) é estritamente um requisito sistêmico criptográfico, e nenhuma lei forçou a sua substituição global pela adoção aberta de IP ou KYC nas transações fundamentais da rede pública.
  * **Erro da Alternativa D:** A oferta unilateral em "somente leitura" feita por um parceiro único representa centralização (Web 2.0), fugindo totalmente dos três critérios do "Dilema de Escolha" para o uso real de blockchain.
</details>

<details>
  <summary><b>Ver Resposta da Questão 7</b></summary>
  
  **Alternativa Correta:** D
  
  * **Justificativa da Correta:** O processo de integrar as finanças tradicionais (R$, US$) à plataforma denomina-se On-Ramp, rotineiramente feito por CEXes. Por contraste, as DEX garantem negociações diretas por Smart Contracts não retendo chaves. Tokens representam ativos gerados logicamente (ERC-20, NFTs), e as moedas bases operacionais (Coins) continuam sendo fundamentais para quitar a taxa computacional (gas) submetida aos validadores.
  * **Erro da Alternativa A:** Testnet e Mainnet não compartilham os mesmos nós validadores; as redes de teste possuem seu próprio ecossistema isolado de nós independentes do Mainnet.
  * **Erro da Alternativa B:** A qualidade fundamental dos protocolos DEX é a total ausência de custódia das chaves e ativos de usuários em bancos tradicionais (SQL).
  * **Erro da Alternativa C:** Apresenta a ordem inversa: Coins são moedas nativas (como o Ether), enquanto Tokens são aplicações arbitrárias sobre contratos inteligentes.
</details>

<details>
  <summary><b>Ver Resposta da Questão 8</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** O *Chain ID* é injetado durante a assinatura matemática das transações na carteira do usuário (EIP-155) especificando sua validade restrita e única para a rede parametrizada (ex: Hardhat `31337`). Sem essa trava criptográfica restritiva, a assinatura seria tecnicamente idêntica e operável de forma maliciosa caso transmitida cruzadamente para outras redes ou *Mainnet* com endereços correspondentes (Replay Attack transversal de redes).
  * **Erro da Alternativa A:** A porta TCP 9222 é do Google Chrome para depuração remota, o fluxo RPC/Hardhat usa requisições HTTP na porta 8545 e o *Chain ID* não roteia redes em si.
  * **Erro da Alternativa C:** A chave privada possui um tamanho de bit invariável determinado pelas curvas elípticas e matematicamente não se condiciona ao número do Chain ID atribuído ao terminal do Hardhat.
  * **Erro da Alternativa D:** Enviar uma transação com ID incorreto gera uma rejeição criptográfica instantânea pela rede na validação das assinaturas, e não a conversão mágica da mutabilidade do envio para uma requisição de leitura `eth_call`.
</details>

<details>
  <summary><b>Ver Resposta da Questão 9</b></summary>
  
  **Alternativa Correta:** C
  
  * **Justificativa da Correta:** A comunicação pelo `window.ethereum` na Web3 baseia-se num pacote RPC que estipula o uso universal de Hexadecimal para números do protocolo de base (o decimal 31337 vira `0x7a69`). Se o método alternador `wallet_switchEthereumChain` falha ao constatar a ausência da rede no registro da MetaMask do usuário, a API dispara um erro (frequentemente 4902) interceptado por lógica frontend (catch). Em resposta imediata, o bloco JavaScript reage acionando `wallet_addEthereumChain` com as propriedades nativas solicitando autorização do usuário na interface.
  * **Erro da Alternativa A:** Não existe submissão em decimal na comunicação RPC (dará erro de casting/formatação), muito menos o nó executa qualquer inversão mágica.
  * **Erro da Alternativa B:** O objeto manipula justamente as invocações codificadas baseadas no protocolo RPC sem envolver a manipulação visual do HTML (`hidden`) com `query parameters` como condição sine qua non da funcionalidade.
  * **Erro da Alternativa D:** Mapear `--user-data-dir=/tmp` ocasionará exatamente o trágico oposto: todo *reload* pesado ou reinicialização limpará as chaves/sessões da carteira local temporária instalada e todas as senhas armazenadas, anulando permissões.
</details>

<details>
  <summary><b>Ver Resposta da Questão 10</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** Inserir conteúdos massivos (imagens, multimídia, ou long strings de PDF) e gravá-los utilizando instruções diretas da VM para o armazenamento no estado permanente do registro (Opcodes `SSTORE`) encarece insustentavelmente a taxa cobrada do usuário de modo que os validadores arquivem e dissemínem esses dados pelo mundo. Para contornar, o protocolo descentralizado IPFS hospeda e distribui arquivos em nuvem P2P gratuita/livre e o compilador Solidity mantém um hash curto mapeado em uma função `pure` e de acesso público. Invocar `eth_call` nessas funções resulta em leitura livre (gratuidade), desobrigando pagamentos a mineradores e evitando a criação sistêmica e o peso on-chain.
  * **Erro da Alternativa A:** Salvar arquivos base64 densos dentro do contrato causa onerosidade extrema na gravação e vai contra a essência e o teto limite do "Gas Limit".
  * **Erro da Alternativa C:** Executar consultas fora do estado global (funções `pure` através da `eth_call` local) possui custo exatamente igual a ZERO Gas, sem propagar transações validadoras para a *Mainnet*.
  * **Erro da Alternativa D:** A execução gratuita é habilitada pelo fato da leitura não promover mudanças de estado da rede e se realizar pontualmente no nó consultado (off-chain reading), sem o encargo de pagar novas tarifas associadas ao Deploy base após a compilação prévia.
</details>
