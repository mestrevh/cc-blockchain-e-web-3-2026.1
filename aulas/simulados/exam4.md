# Simulado de Fixação: Blockchain e Web 3.0 (Nível Fácil)

Este simulado tem como objetivo testar e solidificar a compreensão dos conceitos básicos e fundamentais da Web 3.0, mesclando teoria essencial e noções práticas do dia a dia do desenvolvimento.

---

### Questão 1
Na Web 3.0, os dados e as aplicações não ficam armazenados em um único servidor central pertencente a uma grande empresa (como Amazon, Google ou Facebook). Em vez disso, a rede é mantida por milhares de computadores independentes espalhados pelo mundo. Como essa arquitetura de rede descentralizada é chamada?
- [ ] A) Cliente-Servidor (Client-Server).
- [ ] B) Ponto a Ponto (Peer-to-Peer / P2P).
- [ ] C) Banco de Dados Relacional (SQL).
- [ ] D) Nuvem Centralizada (Cloud Computing).

### Questão 2
Uma das características mais famosas da tecnologia blockchain é a sua **imutabilidade**. Na prática, o que essa propriedade significa para um Contrato Inteligente (*Smart Contract*) após ele ser publicado (*deploy*) na rede principal?
- [ ] A) Significa que o código do contrato não pode mais ser alterado ou apagado, funcionando para sempre exatamente com a lógica com que foi programado.
- [ ] B) Significa que o contrato nunca gastará taxas de "Gas" para ser executado, pois seu tamanho na memória da rede não muda.
- [ ] C) Significa que o contrato inteligente pode sofrer mutações sozinho para corrigir erros lógicos sem que o programador precise autorizar.
- [ ] D) Significa que apenas o desenvolvedor original que criou o contrato tem a senha master para editar as linhas de código quando ele bem entender.

### Questão 3
O que é, de forma simples e direta, um Contrato Inteligente (*Smart Contract*)?
- [ ] A) É um documento de texto no formato PDF (*Portable Document Format*) validado e assinado digitalmente por um advogado cadastrado na rede Ethereum.
- [ ] B) É um programa de computador (código) hospedado dentro da blockchain que executa suas funções de forma automática quando as condições programadas são atendidas.
- [ ] C) É um supercomputador físico de alta performance comprado de forma coletiva pela comunidade para minerar criptomoedas mais rápido.
- [ ] D) É um tipo de banco de dados em nuvem do Google adaptado especificamente para guardar senhas e imagens criptografadas (NFTs).

### Questão 4
Quando um usuário cria uma carteira (*Wallet*) de criptomoedas, como a MetaMask, ele recebe em segredo uma Chave Privada (geralmente representada por uma frase semente de 12 ou 24 palavras). Qual a principal utilidade prática dessa Chave Privada?
- [ ] A) Ela é usada pelo usuário para aprovar e assinar transações digitalmente, provando para a rede que ele é o verdadeiro dono da conta e autorizando a saída dos fundos.
- [ ] B) Ela deve ser enviada publicamente para outros usuários sempre que eles quiserem transferir moedas ou tokens para a sua conta.
- [ ] C) Ela é usada como um "login e senha" tradicional em sites da Web 2.0, substituindo as contas do Facebook e do Google.
- [ ] D) Ela serve para travar algoritmicamente a volatilidade do mercado, mantendo o preço da criptomoeda sempre igual na sua carteira.

### Questão 5
No desenvolvimento de um site Web3 (*Frontend*), nós utilizamos extensões como a MetaMask para conectar a interface web à blockchain. Qual é o nome do objeto JavaScript global que a MetaMask injeta automaticamente no navegador (Google Chrome, Brave, etc.) para tornar essa conexão e comunicação possíveis?
- [ ] A) `window.blockchain`
- [ ] B) `window.crypto`
- [ ] C) `window.ethereum`
- [ ] D) `document.metamask`

### Questão 6
Para que o JavaScript de um site converse com o nó da blockchain (seja o Hardhat local ou a rede principal Mainnet), os dois precisam "falar a mesma língua" de comunicação. Qual é o protocolo padrão da indústria utilizado pela Web 3.0 para estruturar e enviar essas requisições entre o site e a rede?
- [ ] A) HTTP HTML5
- [ ] B) JSON-RPC (Remote Procedure Call usando JSON)
- [ ] C) SOAP XML
- [ ] D) TCP/IP Base64

### Questão 7
Em Solidity, a linguagem de programação dos contratos, as funções precisam de **modificadores** para indicar à rede como vão se comportar. Se um desenvolvedor criar uma função que *apenas lê* o saldo armazenado na blockchain, mas não altera nenhum dado ou valor (sendo portanto gratuita), qual modificador ela deve utilizar?
- [ ] A) `payable`
- [ ] B) `pure`
- [ ] C) `view`
- [ ] D) `external`

### Questão 8
Na rede Ethereum, as moedas digitais podem ser divididas em frações muito pequenas para permitir transações de centavos. A menor unidade de medida possível no sistema é chamada de "Wei". Quantas casas decimais a criptomoeda Ether (ETH) possui, e qual a importância disso?
- [ ] A) Possui apenas 2 casas decimais, assim como o Dólar e o Real fiduciários, facilitando as contas de conversão nos bancos centrais.
- [ ] B) Possui 18 casas decimais ($10^{18}$ Wei), permitindo dividir 1 Ether em trilhões de frações minúsculas e viabilizando micropagamentos exatos com alta precisão matemática sem problemas de arredondamento.
- [ ] C) Não possui casas decimais; toda e qualquer transação na rede deve ser obrigatoriamente feita usando números inteiros fechados (ex: 1 ETH, 5 ETH, 10 ETH).
- [ ] D) Possui 8 casas decimais, pois utiliza o mesmo código-fonte e o mesmo limite matemático originalmente estipulado pelo criador do Bitcoin (Satoshi Nakamoto).

### Questão 9
Ao realizar uma operação de "escrita" que altera dados na rede Ethereum (como enviar dinheiro para um amigo ou registrar um placar de um jogo), o usuário deve pagar uma "taxa de transação" (*Gas Fee*). Para quem vai esse dinheiro pago na taxa e qual o seu propósito no sistema?
- [ ] A) O dinheiro vai para a conta bancária do criador do Ethereum (Vitalik Buterin) como forma de pagar os direitos autorais contínuos sobre o software.
- [ ] B) O dinheiro vai para os nós validadores (os mineradores ou stakers) como recompensa financeira pelo trabalho computacional de processar a transação e manter toda a infraestrutura da rede ligada e segura.
- [ ] C) O dinheiro vai para o governo internacional na forma de impostos globais retidos na fonte sobre transações financeiras digitais P2P.
- [ ] D) O dinheiro não vai para a carteira de ninguém; 100% da taxa é destruída ("queimada") imediatamente apenas para evitar que a transação fique presa no banco de dados.

### Questão 10
Um desenvolvedor quer que a interface (frontend) de seu aplicativo atualize rapidamente uma notificação visual na tela toda vez que uma transferência de ativos acontecer dentro do seu Contrato Inteligente. Qual é o recurso específico da linguagem Solidity utilizado para emitir esses "avisos", criando registros nos logs da blockchain de forma bastante econômica?
- [ ] A) Arrays globais guardados na memória de armazenamento de estado (`storage`).
- [ ] B) Eventos (através das palavras-chave `event` e `emit`).
- [ ] C) A instrução obrigatória de checagem `require()`.
- [ ] D) A propriedade de autoria da transação embutida em `msg.sender`.

<br><br><br><br>

# Gabarito Comentado

<details>
  <summary><b>Ver Resposta da Questão 1</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** A Web 3.0 abandona o formato tradicional de banco de dados único e servidores das empresas de tecnologia (Web 2.0). Ela utiliza a tecnologia Blockchain, que opera através de uma malha de milhares de nós em rede *Peer-to-Peer* (Ponto a Ponto). Nesse modelo descentralizado, todos os participantes se conectam uns aos outros de igual para igual.
  * **Erro da Alternativa A:** "Cliente-Servidor" é o formato exato da Web 2.0, onde você (cliente) pede dados a um computador central (servidor).
  * **Erro da Alternativa C:** Banco de Dados Relacional (como SQL, MySQL) é uma tecnologia de organização de tabelas de empresas centralizadas, e não o nome da arquitetura da rede mundial da Web 3.0.
  * **Erro da Alternativa D:** A "Nuvem" (Cloud) ainda depende de datacenters centralizados (como AWS da Amazon ou Azure da Microsoft), que têm dono único e não são descentralizados por padrão.
</details>

<details>
  <summary><b>Ver Resposta da Questão 2</b></summary>
  
  **Alternativa Correta:** A
  
  * **Justificativa da Correta:** A imutabilidade é uma das grandes forças da blockchain. Uma vez que o contrato foi submetido (deploy) e virou um bloco registrado por toda a rede, o seu código vira pedra e ninguém no mundo pode apagar ou alterar sua lógica de programação (exceto se a lógica prever autodestruição, mas não edição do código raiz).
  * **Erro da Alternativa B:** Imutabilidade não tem relação com o custo do Gas de processamento. Toda transação de escrita consome Gas, não importando o "peso fixo" do contrato.
  * **Erro da Alternativa C:** Os Smart Contracts são "burros" nesse sentido, pois não possuem inteligência artificial para ler e alterar o seu próprio código na caça por bugs lógicos e defeitos.
  * **Erro da Alternativa D:** Essa alternativa fere a premissa de que a Web 3.0 é imutável. Se nem o programador pode alterar as linhas depois que lança (não existe senha de edição no código após o deploy), todos podem confiar nas regras do jogo.
</details>

<details>
  <summary><b>Ver Resposta da Questão 3</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** Essa é a definição clássica. Contratos Inteligentes não são arquivos de texto ou papel PDF com cláusulas jurídicas humanas. Eles são blocos de código (software) enviados para a EVM. Como o código está na blockchain e não sofre intervenção humana, sempre que uma condição prévia for atingida (por exemplo: "se fulano pagar X, transfira o ingresso Y"), o código age sozinho e executa a tarefa imparcialmente.
  * **Erro da Alternativa A:** Advogados, PDFs e cartórios tradicionais fazem parte do formato físico humano e não tem relação conceitual com os programas das blockchains.
  * **Erro da Alternativa C:** A comunidade roda softwares para ajudar na segurança da rede (os nós), mas o termo "Contrato Inteligente" é estritamente o código programado que processa os pagamentos de uma aplicação (DApp), e não peças físicas de hardware.
  * **Erro da Alternativa D:** A blockchain também não é uma nuvem ou banco de dados do Google. Senhas privadas jamais devem ser salvas de forma exposta na rede descentralizada.
</details>

<details>
  <summary><b>Ver Resposta da Questão 4</b></summary>
  
  **Alternativa Correta:** A
  
  * **Justificativa da Correta:** Na criptografia assimétrica, a sua Chave Pública (ou o seu endereço) é a "conta do banco" para a qual as pessoas enviam dinheiro. Mas apenas e somente a Chave Privada é capaz de gerar a "assinatura digital" autorizando saques ou operações naquela conta. Sem ela, seus fundos ficam travados para sempre.
  * **Erro da Alternativa B:** Você NUNCA deve compartilhar sua chave privada ou as 12 palavras da sua frase semente com ninguém. Se alguém a tiver, essa pessoa terá 100% de acesso ao seu dinheiro e o roubará de forma irreversível. Para receber moedas, basta informar o Endereço Público (Chave Pública).
  * **Erro da Alternativa C:** A chave privada atua no fundo do sistema, assinando e criptografando as operações em Web 3.0 (descentralizada). Usá-la num campo de login de senha tradicional em Web 2.0 apenas exporia a chave a um roubo imediato num servidor centralizado de terceiros.
  * **Erro da Alternativa D:** Volatilidade do preço (as variações do Bitcoin para cima ou para baixo) depende apenas do mercado (oferta e demanda de investidores do mundo inteiro). Não há algoritmo de chave privada capaz de controlar ou travar o valor global da moeda.
</details>

<details>
  <summary><b>Ver Resposta da Questão 5</b></summary>
  
  **Alternativa Correta:** C
  
  * **Justificativa da Correta:** A extensão da MetaMask lê a página atual do navegador e insere automaticamente o objeto Javascript `window.ethereum` no contexto global da guia (no DOM). O site acessa essa variável para perguntar ao usuário coisas como: "qual sua conta?", "qual a sua rede?", e "por favor, assine este pagamento de Gas". 
  * **Erro da Alternativa A:** Apesar de intuitivo, os desenvolvedores da carteira MetaMask padronizaram o nome técnico voltado diretamente para a fundação Ethereum.
  * **Erro da Alternativa B:** O atributo `window.crypto` é um recurso padrão do HTML5 (Web 2.0) usado para geração nativa de números aleatórios de criptografia simples em navegadores, mas não se conecta às blockchains.
  * **Erro da Alternativa D:** A variável inserida não leva o nome da empresa carteira (MetaMask), e sim a referência genérica da rede principal (`ethereum`), o que permite que outras marcas concorrentes também usem o mesmo objeto para manter compatibilidade com todos os sites mundiais.
</details>

<details>
  <summary><b>Ver Resposta da Questão 6</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** O protocolo JSON-RPC (Remote Procedure Call formatado com chaves JSON) é a língua franca da Web 3.0. Quando o seu site, o Ethers.js, ou a MetaMask necessitam conversar com um nó da rede local (Hardhat) ou da nuvem (Infura, Alchemy), eles não usam REST padrão. Eles envelopam a pergunta ou comando de transação em arquivos padronizados JSON-RPC e aguardam o nó responder com o mesmo formato.
  * **Erro da Alternativa A:** O HTTP HTML5 é a espinha dorsal de visualização e tráfego de páginas normais web, não é o método focado em chamar processamentos descentralizados nos nós de rede.
  * **Erro da Alternativa C:** O XML (da época do SOAP) é o protocolo antigo robusto muito adotado por sistemas corporativos em Java da Web 2.0, mas a Ethereum optou pela simplicidade e leveza mundial de tráfego do JSON.
  * **Erro da Alternativa D:** A codificação em Base64 converte mídias em texto ou mascara envios binários; as requisições nativas de comunicação da EVM trabalham legivelmente em JSON e blocos ordinais em Hexadecimal, e não em Base64.
</details>

<details>
  <summary><b>Ver Resposta da Questão 7</b></summary>
  
  **Alternativa Correta:** C
  
  * **Justificativa da Correta:** Em Solidity, o modificador `view` é exatamente usado para dizer à blockchain que a função em questão *visualiza* o estado, mas não deve e não vai tocá-lo para alterar dados ou criar novos saldos na memória persistente (*storage*). Como ler dados de blocos consolidados não exige processamento extra de validação dos mineradores, funções `view` não cobram pagamento em Gas para serem consultadas por fora da rede (via site).
  * **Erro da Alternativa A:** O modificador `payable` indica o cenário totalmente inverso: que a função recebe fundos de pagamento em tempo real, exigindo aprovação financeira cara pela rede.
  * **Erro da Alternativa B:** O modificador `pure` é ainda mais cego que o *view*. Ele serve para cálculos matemáticos locais que **não** podem sequer ler as memórias guardadas na blockchain (como a leitura do "saldo na blockchain" que está exposta no enunciado).
  * **Erro da Alternativa D:** O `external` apenas aponta de "onde" a função pode ser acionada (devem ser chamadas por agentes fora do contrato) mas por si só não impede que aquela função cobre por modificar as variáveis do banco se o dev assim desejar programá-la.
</details>

<details>
  <summary><b>Ver Resposta da Questão 8</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** A moeda "física" do dia a dia possui subdivisão até duas casas decimais (1 real e 100 centavos). O Ether (ETH) se propõe a ser a rede financeira interplanetária de computadores. Ela precisa fracionar o processamento por pedaços muito pequenos (Micropagamentos e cálculo de Opcodes). Por isso, 1 ETH possui exatamente 18 casas decimais. Essa nanoescala é o chamado *Wei*. O Solidity faz todas as contas e travas sem usar números com vírgula para não haver falhas matemáticas de arredondamento nos supercomputadores da rede mundial.
  * **Erro da Alternativa A:** Ao contrário do real, ter apenas 2 casas decimais impossibilitaria uma pessoa pagar frações exatas comissionadas e minúsculas como U$ 0,0005 num cálculo de rede computacional (o sistema arredondaria, criando prejuízo inaceitável nas engrenagens das transações mundiais programáveis).
  * **Erro da Alternativa C:** Transacionar obrigatoriamente números inteiros de 1 ETH travaria o uso em massa pela população pobre, visto que 1 Ether pode valer mais de U$ 3.000,00 (dólares), encarecendo totalmente transações usuais do dia-a-dia na plataforma se frações não existissem no bloco.
  * **Erro da Alternativa D:** A rede de Nakamoto (o Bitcoin) possui o padrão máximo de exatas 8 casas decimais (as subunidades denominadas *Satoshis*). A equipe criadora da EVM subiu o nível de precisão de casas fracionárias ainda mais ao desenharem e evoluírem as exigências monetárias de contratos inteligentes (para 18).
</details>

<details>
  <summary><b>Ver Resposta da Questão 9</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** Uma rede descentralizada não funciona do nada — ela precisa de pessoas no mundo inteiro comprando computadores potentes para processar as transações o tempo inteiro, além de gastar internet e luz. A taxa do Gas é exatamente a engrenagem capitalista de estímulo financeiro: quando você paga Gas, esse dinheiro é automaticamente transferido e dividido como recompensa aos mineradores (Proof of Work) ou validadores stakers (Proof of Stake) como prêmio por manterem o seu serviço rodando sem fraudes na proteção das garantias.
  * **Erro da Alternativa A:** Nenhum fundador detém o monopólio ou a cobrança de royalties, patentes ou cobranças contínuas pela licença comercial; o sistema é *open source* (código aberto).
  * **Erro da Alternativa C:** Os blocos, as funções e o sistema em código P2P criptográfico original independem de nacionalidade e não realizam apurações judiciais e envios ao Banco Central do país originário na forma impessoal de arrecadação obrigatória governamental.
  * **Erro da Alternativa D:** A rede Ethereum atualmente de fato "queima" ativamente uma parte das taxas (Protocolo EIP-1559) para combater a inflação de moedas do mercado, MAS uma parcela do *Fee* e o prêmio do bloco *Priority Fee* são sim enviadas inteiramente à carteira do nó que gerou o processamento; logo, a alegação de 100% destruída da alternativa anula e invalida a sentença.
</details>

<details>
  <summary><b>Ver Resposta da Questão 10</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** Declarar eventos (`event`) e dispará-los (`emit`) nas funções de transação faz com que o contrato da blockchain gere um pequeno registro anexado nos "Logs do Bloco". As interfaces frontend baseadas em Javascript ficam "escutando" as ondas de eventos da rede. Toda vez que ouvem um disparo com o ID daquele contrato, a aba do navegador exibe o balãozinho para o usuário. Essa tática da EVM é barata e extremamente econômica, resolvendo o problema global de comunicação.
  * **Erro da Alternativa A:** Guardar ocorrências textuais repetitivas em Arrays permanentes (Memória Storage) faria o usuário arcar com custos altíssimos de Gas à toa (gravação na memória rígida de longo prazo em estado global), onerando financeiramente todo o jogo para os participantes.
  * **Erro da Alternativa C:** A função do comando `require` do Solidity é impedir que transações corrompidas, falhas e falsas sigam em frente na memória RAM, interrompendo com um erro ("Transaction Reverted"), e não gerando sinalizadores limpos de acompanhamento diário assíncrono para os apps HTML da camada de cima da página.
  * **Erro da Alternativa D:** `msg.sender` é apenas a variável criptográfica embutida pela EVM no escopo da função para avisar em segredo ao código qual foi o endereço exato que acionou aquela tela naquele momento (controle contra invasores falsificados); em nada servindo sozinha para alertar os painéis WebSockets sobre eventos novos gerados para o DOM ver globalmente.
</details>
