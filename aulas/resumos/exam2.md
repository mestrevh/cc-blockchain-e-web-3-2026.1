# Simulado Prático: Blockchain e Web 3.0 (Nível Médio)

Este simulado foca na aplicação prática de conceitos de Blockchain e Web 3.0, simulando cenários reais de engenharia de software, tomada de decisão arquitetural e integração de contratos inteligentes com aplicações frontend.

---

### Questão 1
Uma grande empresa deseja desenvolver um aplicativo interno para gerenciar o controle de ponto e as férias de seus funcionários. O sistema será utilizado exclusivamente pelo departamento de Recursos Humanos (RH) e pelo diretor da empresa, que possuem total autoridade sobre os dados. Um desenvolvedor júnior sugere construir o sistema utilizando uma rede Blockchain para modernizar a infraestrutura. Aplicando o "Dilema de Escolha" (Regra Prática) para adoção de blockchain, qual a análise correta sobre essa decisão?
- [ ] A) A adoção da blockchain é correta, pois a tecnologia descentralizada garante que o departamento de RH processe as solicitações de férias em paralelo e com maior velocidade.
- [ ] B) A adoção é incorreta. Como existe uma autoridade central confiável (RH/Diretor) e não há um cenário de desconfiança mútua entre as partes, um banco de dados tradicional (SQL) é mais eficiente, barato e adequado para o caso.
- [ ] C) A adoção é correta, desde que se utilize uma Blockchain Pública baseada em Proof of Work (PoW) para garantir a integridade dos espelhos de ponto perante a justiça trabalhista.
- [ ] D) A adoção é incorreta porque a blockchain não suporta nativamente a linguagem JavaScript, impedindo a criação do aplicativo interno para o setor.

### Questão 2
Um desenvolvedor implementou um contrato inteligente em Solidity que distribui recompensas para usuários de um jogo. Devido a um erro de lógica, a função `recompensar()` continha um laço de repetição infinito (*infinite loop*). Um jogador chamou essa função pela MetaMask, assinando a transação. O que acontecerá com a transação do jogador e com a rede (EVM) durante essa execução?
- [ ] A) A EVM sofrerá um travamento sistêmico temporário, forçando os validadores a reiniciar a rede para derrubar o laço de repetição.
- [ ] B) A transação será executada e consumirá o "Gas" (taxa da rede) fornecido pelo jogador continuamente. Quando o Gas acabar, a transação será abortada por falta de fundos (reversão atômica), preservando o estado anterior da rede.
- [ ] C) O contrato inteligente detectará o laço infinito automaticamente e aplicará o modificador `pure` na função para que a transação não custe dinheiro ao usuário.
- [ ] D) O jogador receberá recompensas infinitas, pois, uma vez que a transação foi validada pela sua chave privada, o saldo gerado pelo contrato não pode ser bloqueado.

### Questão 3
Em uma exchange descentralizada (DEX), Alice envia uma transação pagando 50 tokens para Bob. Um hacker intercepta os pacotes da rede, captura a assinatura digital perfeitamente válida dessa transação e tenta retransmiti-la idêntica para a blockchain cinco vezes seguidas, tentando forçar a conta de Alice a enviar 250 tokens para Bob (Ataque de Reprodução / *Replay Attack*). Por que a blockchain rejeitará automaticamente as tentativas do hacker?
- [ ] A) Porque os validadores utilizam a árvore de Merkle (Merkle Root) para alterar a chave pública de Alice após cada envio bem-sucedido.
- [ ] B) Porque a transação original contém um componente numérico de uso único (Nonce) que já foi consumido e marcado como "utilizado" no primeiro processamento; pacotes duplicados com o mesmo Nonce são inválidos.
- [ ] C) Porque o hacker precisaria ter acesso ao Chain ID hexadecimal (`0x7a69`) para converter a transação da Mainnet para a Testnet do Bob.
- [ ] D) Porque o contrato inteligente de Bob possui uma função `require` que bloqueia recebimentos superiores a 50 tokens no mesmo dia.

### Questão 4
Uma startup de jogos Web3 decidiu gerenciar os ativos digitais de seus usuários usando uma arquitetura de Corretora Centralizada (CEX), com o intuito de facilitar o *On-Ramp* para leigos. Nesse modelo, a startup mantém a custódia das chaves privadas em seus servidores locais. Após um ciberataque, o banco de dados é vazado e o hacker utiliza as chaves privadas para esvaziar os fundos dos jogadores. A startup pode solicitar o cancelamento e reversão das transações à rede blockchain?
- [ ] A) Sim, desde que comprove às autoridades certificadoras da rede que as assinaturas foram feitas por IPs não reconhecidos.
- [ ] B) Sim, acionando uma transação de reversão administrativa diretamente através do objeto `window.ethereum` no frontend do sistema.
- [ ] C) Não. A blockchain descentralizada valida a autorização pela chave privada de forma matemática. Como as transferências foram assinadas com as chaves legítimas (ainda que roubadas), as transações são válidas e imutáveis.
- [ ] D) Não, a menos que os fundos tenham sido enviados para o endereço zerado (`address(0)`), o qual possui mecanismo nativo de estorno em caso de ataques hackers.

### Questão 5
Um engenheiro frontend está construindo a página de um *marketplace* de NFTs. Ele precisa exibir o preço atual de um item para qualquer usuário que acessar a página, consultando o contrato inteligente. Para garantir que os visitantes não precisem pagar taxas de rede (*Gas*) apenas para visualizar o preço, como a função deve ser concebida em Solidity e invocada no JavaScript (`ethers.js`)?
- [ ] A) Deve ser definida como `payable` no Solidity para que a MetaMask não exija fundos na aprovação do usuário.
- [ ] B) Deve ser definida com o modificador `view` no Solidity (pois acessa o estado de leitura) e será invocada gratuitamente via `eth_call` no JavaScript, sendo resolvida de forma local sem gerar transação minerada.
- [ ] C) Deve omitir qualquer modificador e usar `tx.wait()` no JavaScript para que a página aguarde o processamento do bloco do preço.
- [ ] D) Deve ser definida como `pure`, pois a leitura de preços de itens em um marketplace não requer acesso às variáveis de *storage* da blockchain.

### Questão 6
Ao desenvolver a arquitetura de um jogo play-to-earn, o desenvolvedor precisa salvar um registro contendo a data, o remetente e a pontuação a cada partida finalizada. Armazenar o histórico de todas as partidas de todos os jogadores utilizando um array no estado global do contrato (*storage*) está gerando custos de Gas inviáveis, espantando os jogadores. Qual a melhor prática arquitetural para manter um histórico auditável na blockchain reduzindo drasticamente os custos transacionais?
- [ ] A) Mudar as variáveis de pontuação de inteiros para strings criptografadas em Base64, que consomem menos espaço na EVM.
- [ ] B) Exigir que as transações de término de partida sejam validadas exclusivamente na rede Sepolia (Testnet), garantindo a gratuidade perpétua do sistema.
- [ ] C) Trocar o armazenamento do array por declaração de Eventos (`event`). A emissão (`emit`) grava as informações nos logs dos blocos, uma área de armazenamento muito mais barata do que as variáveis de *storage* do contrato.
- [ ] D) Remover as validações com `require` antes da gravação do histórico, o que anula os custos computacionais da função para o usuário.

### Questão 7
No front-end de um aplicativo Web3, o botão "Transferir" invoca uma função do smart contract para enviar tokens a um amigo. Atualmente, assim que o usuário clica em "Confirmar" na MetaMask, a tela exibe "Sucesso! Tokens enviados" quase instantaneamente. No entanto, minutos depois, os usuários reclamam que os fundos não chegaram, descobrindo que a transação na verdade falhou na rede. Como o desenvolvedor deve alterar o código JavaScript (`ethers.js`) para evitar que essa mensagem prematura ocorra?
- [ ] A) O desenvolvedor deve usar `await tx.wait()` logo após o disparo da transação, forçando a aplicação a aguardar a confirmação de que a transação foi efetivamente minerada em um bloco antes de atualizar a UI.
- [ ] B) Ele deve alterar o modificador da função de transferência de `external` para `pure` no Solidity, tornando a transação síncrona.
- [ ] C) Ele precisa adicionar um temporizador JavaScript (ex: `setTimeout`) de 5 segundos, que é o tempo fixo universal para a mineração em todas as redes blockchain.
- [ ] D) Ele deve implementar `wallet_switchEthereumChain` antes da transferência para garantir que a rede esteja atualizada no navegador.

### Questão 8
Ao programar a lógica de distribuição de lucros em um contrato inteligente, o desenvolvedor cria uma função para enviar Ether ao dono do negócio. No entanto, ele precisa se certificar de que um erro de digitação do endereço no frontend não faça o dinheiro ser destruído acidentalmente pela rede ("Token Burning"). Que tipo de validação em Solidity é comumente inserida no topo da função para impedir essa falha grave?
- [ ] A) `require(msg.value > 0, "O valor enviado nao pode ser zero");`
- [ ] B) `require(to != address(0), "Endereco de destino invalido");` para assegurar que os fundos não sejam despachados para a conta sem chave privada responsável pela queima de moedas.
- [ ] C) `require(to == msg.sender, "Transferencia apenas para o emissor");`
- [ ] D) Uma cláusula `try-catch` que verifique se a carteira de destino possui os fundos necessários em *Wei*.

### Questão 9
A equipe de tecnologia implementou uma nova lógica matemática e uma nova variável em um contrato inteligente, recompilou o código e realizou o deploy atualizado no ambiente do Hardhat (rede local). O frontend da aplicação, no entanto, começou a retornar erros do tipo `method not found` ou parâmetros incompatíveis quando tentava acionar as funções que acabaram de ser testadas. O que o time provavelmente esqueceu de atualizar no repositório de frontend?
- [ ] A) A inicialização do Chrome utilizando a porta local `--remote-debugging-port=9222`.
- [ ] B) O arquivo de variáveis `.env` e a ABI (Application Binary Interface) gerada pela nova compilação. Sem a ABI atualizada e o novo endereço de contrato (Contract Address), o objeto `ethers.Contract` no JavaScript desconhece as mudanças estruturais e aponta para o contrato antigo/inexistente.
- [ ] C) O *Chain ID*, que sofre incremento numérico a cada novo deploy feito no mesmo terminal.
- [ ] D) O cache do `window.ethereum`, que precisa ser limpo utilizando a função `emit` no navegador para desvincular o estado global.

### Questão 10
Para que um site Web3 desenvolvido para uma rede local (ex: Hardhat) funcione da maneira mais amigável possível, ele verifica a rede atual do usuário logado via MetaMask e, se a pessoa estiver na rede errada (como Ethereum Mainnet), tenta chavear ou adicionar a configuração da rede de testes automaticamente. Utilizando a API JSON-RPC `window.ethereum`, como se dão os métodos e as formatações desse fluxo programático?
- [ ] A) Usa-se a função `eth_call` enviando um objeto contendo o nome "Localhost" em formato Base64.
- [ ] B) Invoca-se primeiro `wallet_switchEthereumChain` passando o *Chain ID* em formato obrigatoriamente hexadecimal (ex: `0x7a69`). Se a rede não existir na carteira do usuário, a API captura a exceção e aciona o método auxiliar `wallet_addEthereumChain` com os metadados (RPC URL, etc).
- [ ] C) Transmite-se um evento `wallet_addEthereumChain` utilizando a porta `9222` do VS Code, enviando o Chain ID padrão `31337` em formato decimal.
- [ ] D) A API requisita que o usuário forneça sua *Seed Phrase* manualmente no frontend, permitindo que a própria página atualize as configurações internas do MetaMask.

<br><br><br><br>

# Gabarito Comentado

<details>
  <summary><b>Ver Resposta da Questão 1</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** O dilema de escolha ensina que a adoção da blockchain é justificada quando múltiplas partes precisam interagir de forma imutável sem confiar umas nas outras ou em uma autoridade central. No caso de um sistema de RH corporativo fechado, o RH e o Diretor já são a autoridade central confiável para a empresa. Usar blockchain aqui apenas adiciona lentidão, complexidade desnecessária e custo. Um banco tradicional relacional atende perfeitamente à demanda corporativa.
  * **Erro da Alternativa A:** A blockchain descentralizada sofre de problemas de escalabilidade (menor TPS) e não paraleliza processamentos como os servidores centralizados corporativos poderiam fazer, logo ela diminui a velocidade em vez de aumentá-la.
  * **Erro da Alternativa C:** Usar Proof of Work e blockchain pública exporia os dados de jornada e férias de toda a empresa ao público, violando normas de privacidade e sigilo corporativo.
  * **Erro da Alternativa D:** A blockchain pode ser acessada por aplicativos cujos frontends sejam programados em JavaScript e conectados através de bibliotecas como `ethers.js` ou `web3.js`, sem impeditivos sistêmicos.
</details>

<details>
  <summary><b>Ver Resposta da Questão 2</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** Devido à natureza "Turing Complete" do Solidity, laços infinitos são possíveis. Para evitar que a EVM seja derrubada por essas execuções sem fim (travamento de hardware), a rede introduz o conceito do Gas limit. O laço executa gastando os fundos oferecidos pelo usuário (taxa da transação) a cada ciclo. Quando a quantia de gas esgota, a EVM interrompe o código abruptamente com uma exceção de *Out of Gas* e garante a atomicidade: reverte todas as mudanças que ocorreram dentro do loop, mantendo a integridade da rede sem travamentos.
  * **Erro da Alternativa A:** A EVM não sofre travamento sistêmico ou necessita de reboot, o problema é resolvido automaticamente pelo esgotamento de Gas alocado pelo remetente da chamada.
  * **Erro da Alternativa C:** Contratos não se autocorrigem alterando os seus próprios modificadores de acesso (como mudar magicamente para `pure`), sendo sua lógica estritamente imutável após implantada.
  * **Erro da Alternativa D:** Como a transação será revertida pelo limite do pagamento da taxa, o saldo falso gerado momentaneamente não será consolidado nos blocos.
</details>

<details>
  <summary><b>Ver Resposta da Questão 3</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** A blockchain combate o Ataque de Reprodução (*Replay Attack*) incluindo obrigatoriamente um identificador numérico único em cada mensagem, denominado *Nonce* (Number used once) ou com o auxílio do Timestamp. Ao processar o envio dos 50 tokens, os nós gravam que o Nonce correspondente da carteira de Alice foi utilizado. Quando o hacker tenta repassar a cópia da transação, os validadores percebem que a assinatura contém um Nonce ultrapassado e rejeitam os clones instantaneamente.
  * **Erro da Alternativa A:** O Merkle Root agrupa hashes das transações de um bloco para eficiência e integridade e não se presta à alteração de chave pública da conta do usuário.
  * **Erro da Alternativa C:** Interceptar uma transação não tem relação com converções de Mainnet para Testnet; o invasor tentaria enviar o clone para a mesma Mainnet onde Alice possui fundos válidos.
  * **Erro da Alternativa D:** Não há uma função automática invisível na EVM para limitar limites diários numéricos de envio entre usuários.
</details>

<details>
  <summary><b>Ver Resposta da Questão 4</b></summary>
  
  **Alternativa Correta:** C
  
  * **Justificativa da Correta:** O modelo CEX atua no princípio de que a posse da chave privada equivale ao acesso físico a um cofre. Ao optar por guardar suas chaves no banco de dados da CEX, o usuário delegou a custódia. Quando roubadas, o invasor as utiliza para fornecer assinaturas criptograficamente incontestáveis para a rede P2P. A blockchain é imutável: ela acata qualquer transação que porte a assinatura válida e não possui meios centrais para reverter a história ou congelar operações passadas.
  * **Erro da Alternativa A:** A rede descentralizada Ethereum ou Bitcoin não possui entidades, como governos ou autoridades certificadoras, detentoras do poder técnico de rolar os blocos para trás ou proibir operações mediante detecção de IPs suspeitos.
  * **Erro da Alternativa B:** O `window.ethereum` no frontend é apenas um canal que emite requisições RPC; ele não detém poder administrativo para reverter dados já minerados e registrados num bloco global.
  * **Erro da Alternativa D:** A queima de tokens (`address(0)`) remove os ativos de circulação; contudo, hackers não queimam tokens intencionalmente, eles os desviam para carteiras sob seu próprio controle buscando lucro.
</details>

<details>
  <summary><b>Ver Resposta da Questão 5</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** Sempre que o frontend precisar apenas ler dados estruturais registrados na EVM e apresentá-los na interface (como os valores salvos no Storage do contrato), a função Solidity deve portar o modificador `view`. Essa ação permite a invocação pelo método `eth_call` do Web3 (via Ethers.js), configurando um processo restrito ao nó local de RPC em que o cliente estiver conectado. Por não alterar estados nem demandar bloco minerado para consenso, é absolutamente gratuito, poupando Gas do usuário do marketplace.
  * **Erro da Alternativa A:** `payable` serve justamente para o oposto: autorizar que uma função modifique dados na rede recebendo explicitamente Ether em transferências.
  * **Erro da Alternativa C:** Omisso de modificadores, o compilador presume potencial alteração de estado (operação mutável), e chamar `tx.wait()` travaria a página para confirmar uma transação desnecessariamente criada e tributada ao usuário.
  * **Erro da Alternativa D:** A palavra `pure` é aplicável apenas e exclusivamente a métodos estáticos de cálculos e conversões abstratas que jamais consultam valores de estados na EVM (e o preço do item inevitavelmente está salvo no Storage do protocolo).
</details>

<details>
  <summary><b>Ver Resposta da Questão 6</b></summary>
  
  **Alternativa Correta:** C
  
  * **Justificativa da Correta:** Armazenar dados permanentemente em matrizes (arrays) na memória de *storage* eleva astronomicamente a tarifa de processamento, haja vista que tais registros devem ser atualizados e consolidados nas máquinas de milhares de nós mundo afora. Uma técnica fundamental consiste na emissão declarativa de eventos (`event` e `emit`). Ela imprime uma prova estruturada nas áreas exclusivas de relatórios/logs dos blocos, uma região de armazenamento de histórico barata que as DApps inspecionam para construir históricos e relatórios no jogo, contornando gargalos de Gas da escrita profunda.
  * **Erro da Alternativa A:** Mesmo transmutadas criptograficamente, variáveis Base64 continuarão ocupando slots dispendiosos na estrutura cara do *storage* dos smart contracts, e são até menos orgânicas à EVM que números primitivos.
  * **Erro da Alternativa B:** Direcionar produção vitalícia corporativa a redes "Testnet" invalida totalmente a remuneração econômica dos ativos digitais concebidos para os jogadores (Play-to-earn) pois as moedas do ambiente Sepolia são puramente fictícias.
  * **Erro da Alternativa D:** Remoções ou anulações mecânicas de cláusulas de segurança `require` da linguagem não eliminam de maneira nenhuma o custo tabelado de infraestrutura atrelado a modificações volumosas nas variáveis do storage.
</details>

<details>
  <summary><b>Ver Resposta da Questão 7</b></summary>
  
  **Alternativa Correta:** A
  
  * **Justificativa da Correta:** O acionamento de um método contratual `ethers.js` via interface reage por padrão entregando um hash transitório da inserção do pacote na Mempool. Exibir um estado de vitória na interface neste instante exato ilude o cliente. Para criar um UX seguro e confiável, o Javascript é orientado pela promessa do `await tx.wait()`. Somente após o nó ratificar a absorção oficial na contabilidade e a rede confirmar o processamento do bloco, o código retoma a execução, acionando de forma apropriada o popup visual indicativo da conclusão final.
  * **Erro da Alternativa B:** Modificar acessos visuais da assinatura (`external` para `pure`) além de barrar alteração de valores globais (transferências ficariam impossíveis), gera colisão sintática de codificação no Solidity, e não viabiliza a sincronia natural front/back.
  * **Erro da Alternativa C:** Os blocos das redes têm cronogramas variados e picos de flutuações, sem garantias constantes engessadas (o timer pode estourar ou apitar antecipadamente).
  * **Erro da Alternativa D:** `wallet_switchEthereumChain` resolve unicamente problemas de conectividade anterior onde o cliente se encontre em blockchains alheias, não operando sincronia assíncrona do trâmite temporal de blocos pendentes no JavaScript.
</details>

<details>
  <summary><b>Ver Resposta da Questão 8</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** Enviar Ether ou ativos digitais ao chamado Endereço Zero (`address(0)`) remove irreversivelmente a moeda circulante (fenômeno apelidado de Queima ou Token Burning), vez que não existem credenciais algorítmicas de curva elíptica geradoras da chave privada desta hash específica. Ao condicionar funções monetárias de payout via a restrição `require(to != address(0))`, as linhas preventivas vetam falhas em interfaces da web cujos usuários submetam envios nulos e interrompem a transação instantaneamente devolvendo todos os fundos ao emissor íntegros.
  * **Erro da Alternativa A:** Embora possa ser uma checagem de lógica em dApps, impedir que se envie 0 fundos não se atrela diretamente à proteção e destruição cega dos bens pelo endereço de queima `address(0)`.
  * **Erro da Alternativa C:** Restringir operações de pagamentos forçando envio estritamente à mesma carteira origem impossibilitaria o próprio sentido do negócio ou a transferência para o dono, não tendo méritos protetores contra a conta zerada de perda financeira generalizada.
  * **Erro da Alternativa D:** Cláusulas de controle operante de escopos Solidity (`try-catch`) são empregadas primariamente validando contatos com interfaces de terceiros integrados (contratos externos); checagem trivial de nulidade no endereço se constrói e atua na fundação básica provida por `require`.
</details>

<details>
  <summary><b>Ver Resposta da Questão 9</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** O paradigma de ponte entre os clientes em JavaScript e a cadeia nativa de códigos computacionais da Máquina Virtual do Ethereum assenta-se irrevogavelmente sobre as interfaces JSON (Application Binary Interface - ABI) e as chaves fixas das alocações. Após o deploy, um novo bytecode ganha um Contract Address individual recém-gerado, e toda modificação sistêmica nas funções acarreta mudanças nos descritores da ABI. Integrantes do Frontend que ignorarem a cópia rigorosa dessa ABI e endereço no projeto farão com que as APIs de encapsulamento como `ethers.js` codifiquem o payload orientadas a métodos antigos (retornando as chamadas Method Not Found ou referências vazias).
  * **Erro da Alternativa A:** Argumentos de invocação remota em terminais (`--remote-debugging-port`) engajam captura unicamente de bugs operacionais isolados no DevTools da plataforma Chrome, sem nenhum poderio ou interferência sintática sob a defasagem e integração lógica das APIs da blockchain.
  * **Erro da Alternativa C:** Reinicializações da Máquina Hardhat local recriam o servidor a partir do Bloco Genesis retendo ininterruptamente o seu Chain ID padrão identificador (`31337`).
  * **Erro da Alternativa D:** Sessões visuais em aplicações baseadas em objetos de provedores como `window.ethereum` perdem e renovam sua alocação de cache da janela perante recarregamentos (F5) simplificados na web; o entrave focado remete explicitamente à dissociação arquitetural do JSON da rede.
</details>

<details>
  <summary><b>Ver Resposta da Questão 10</b></summary>
  
  **Alternativa Correta:** B
  
  * **Justificativa da Correta:** Nos scripts modernos injetados por carteiras populares no DOM (`window.ethereum`), acionar funções sistêmicas restritivas exige formatação técnica via RPC Protocol (JSON). Operadores indicam que IDs decimais (ex. 31337) sejam encapsulados no envio obrigatoriamente sob hexadecimal explícito (`0x7a69`). O encadeamento profissional testa a presença dessa rede e aciona inicialmente o Request condicionado para efetuar o *switch*. Fracassando a requisição caso o cliente seja novo no local e niegue presença do cache daquele Chain ID (Status 4902), a rotina do frontend aborda o fluxo de *Catch* oferecendo de bom tom o modelo preenchido de `wallet_addEthereumChain` com a nova RPC, promovendo o acoplamento autônomo e sem fricção.
  * **Erro da Alternativa A:** Métodos e referências nativos baseiam-se em valores de Hex e JSON-RPC; a submissão transacional contendo formatação em strings codificadas Base64 ocasiona falha total do parser nos pacotes do Ethereum.
  * **Erro da Alternativa C:** Modificações globais sistêmicas relativas aos componentes de chaveamento de redes provêm dos injetores JSON restritos do MetaMask, não tendo vínculo funcional associável a envios na porta `9222` focada do VS Code para os logs no painel.
  * **Erro da Alternativa D:** Solicitar e processar `Seed Phrases` originárias ativas na UI do DOM é a quebra basilar cabal de toda e qualquer diretriz internacional em criptografia; ferramentas de terceiros sob a API restringem-se ao gerenciamento cego provido unicamente pela abstração das interações do Provedor.
</details>
