# Aulas práticas de blockchain

### Aula 8

Comando para criar o debug do chrome no wsl:

```bash
alias chrome-debug="/mnt/c/Program\ Files/Google/Chrome/Application/chrome.exe --remote-debugging-port=9222 --user-data-dir=C:\\chrome-dev-profile"

```

Agora execute o comando:

```bash
chrome-debug
```

Plano B

Aperte a tecla `Windows + R` e digita o comando

```bash
chrome.exe --remote-debugging-port=9222 --user-data-dir="C:\chrome-dev-profile"
```

#### Execução da blockchain
Execução do motor da blockchain:

```bash
    npx hardhat node
```

Através do package.json existe o comando:

```bash
    npm run chain
```

#### Execução do frontend

```bash
npm run frontend:dev
```

Pesquisar sobre JSON-RPC

### Aula 9

1. Para falar com o objeto da metamask deve usar o variável `window.ethereum`. Dentro dele você pode interagir com a carteira.
2. Para o erro de troca de rede o tratamento tem que ser com `try/catch` ao tentar fazer `wallet_swithchEthereumChain` e der erro, basta colocar `wallet_addEthereumChain`.

#### Preparando o Frontend

Instalando o `browser-sync` para que ele atualize automaticamente a página sempre que um arquivo for salvo.

```bash
npm install browser-sync --save-dev
```

Criando a estrutura


Criando um botão para se conectar com wallet

`frontend/index.html`

```html
<section>
    <!-- Este é o botão que vai chamar a MetaMask -->
    <button type="button" id="btn-connect">Connect Wallet</button>
    <p id="wallet"></p>
</section>
```

Esse botão estará vai ser ativado em `app.js` no evento de ser clicado e a carteira vai aparecer no `wallet`.

```js
// 1. Pegamos os elementos HTML que vamos manipular
const btnConnect = document.getElementById('btn-connect');
const walletText = document.getElementById('wallet');

// 2. Criamos o evento de clique do botão
btnConnect.addEventListener('click', async () => {
  // Verificamos se o navegador tem a MetaMask instalada
  if (typeof window.ethereum !== 'undefined') {
    try {
      // 3. Fazemos o pedido RPC para conectar a carteira
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // A MetaMask retorna um array de contas. Pegamos a primeira (Account #0)
      const userAddress = accounts[0];
      
      // Atualizamos o texto na tela
      walletText.innerText = `Conectado: ${userAddress}`;
      console.log("Sucesso! O endereço do usuário é:", userAddress);
      
    } catch (error) {
      console.error("O usuário rejeitou a conexão ou ocorreu um erro:", error);
    }
  } else {
    walletText.innerText = "MetaMask não encontrada. Por favor, instale a extensão.";
  }
});

```

Basicamente esse código em `js` é responsável pela conexão dentro do window.ethereum (onde fica a metamask), após a conexão deve aparecer a chave publica. Isso aconteceu!!!

### Aula 10

Criando o primeiro contrato inteligente dentro do diretório `contracts/`

```solidity
pragma solidity ^0.8.20;

contract HelloWorld {

    function getMessage() public pure returns (string memory) {
        return unicode"hello world from blokchain";
    }
}
```

Para compilar esse contrato e deixar na rede local da blockchain é utilizado o comando abaixo no terminal:

```bash
npm run compile
```

A partir desse momento temos o `deploy.js`:

```javascript
async function main() {

    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const contract = await HelloWorld.deploy();
    await contract.waitForDeployment();
    console.log("Contrato deployado em:", await contract.getAddress());
}


main().catch((error => {
    console.log(error);
    process.exitCode = 1;
}));
```

Esse deploy serve para conseguimos o endereço de acesso para o contrato na rede local.
Para acessamos foi feito um botão pegando essa mensagem a partir `ethers.Contract`.

### Aula 11

Explorando o solidity, como na blockchain só possui 2 operações: criar e ler, existe uma diferença em utilizar o `pure` e `view`. Pure está responsável apenas por ser um codigo sem alterar e nem ler algo do smart contract, ou seja, sempre é estatico e não necessariamente está na blockchain. Já o view é responsável por ler e não pode alterar o estado do smart contract.

Código alterado:

```solidity
uint256 public storedData;

function set(uint256 x) public {
  storedData = x;
}

function get() public view returns (uint256) {
  return storedData;
}
```

Importante, toda alteração no smart contract é preciso rodar novamente o comando abaixo:

```bash
npm run compile
```

Importante mencionar que para o `stateMutability` no [name].sol/[name].json