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

// Parte para verificar a troca de rede
const btnAddNetwork = document.getElementById("btn-add-network");

btnAddNetwork.addEventListener('click', async () => {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x7a69' }]
        });
        console.log("Sucesso! Já estava com a rede cadastrada!");
    } catch (error) {
        if (error.code == 4902) {
            console.log("Rede não encontrada. Pedindo para a Metamask adicionar...");

            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0x7a69',
                            chainName: 'Hardhat local',
                            rpcUrls: ['http://localhost:8545'],
                            nativeCurrency: {
                                name: 'Ether',
                                symbol: 'ETH',
                                decimals: 18,
                            },
                        },
                    ],
                });
            } catch (addError) {
                console.error("Erro ao tentar adicionar a rede: ", addError);
            }

        } else {
            console.log("Ocorreu um erro deconhecido", error);
        }
    }
});

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = [
    {
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMessage",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "x",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "storedData",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

const btnMessage = document.getElementById("btn-get-message");
const messageTxt = document.getElementById("message-text");

btnMessage.addEventListener('click', async () => {

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        const message = await contract.getMessage();

        messageTxt.innerText = message;

    } catch (error) {
        console.error("Erro ao ler a mensagem: ", error);
        messageTxt.innerText = "Erro ao ler. Verifique o console.";
    }

});

const btnGetX = document.getElementById('btn-get-x');
const msgX = document.getElementById('get-x');

btnGetX.addEventListener('click', async () => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Enviando transação...");
        const tx = await contract.set(10);
        await tx.wait();

        console.log("Transação confirmada!");

        const message = await contract.get();


        msgX.innerText = "O valor de X é: " + message;

    } catch (error) {
        console.error("Erro ao ler o valor de x: ", error);
        msgX.innerText = "Erro ao ler. Verifique o console.";
    }
});
