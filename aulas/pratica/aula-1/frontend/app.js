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
