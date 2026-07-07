import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Desabilitado a pedido: não auto-conectar ao carregar a página
    // checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setupEthers(accounts[0]);
      }
    } catch (error) {
      console.error('Erro ao verificar carteira conectada:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask não encontrada! Instale a extensão no seu navegador.');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setupEthers(accounts[0]);
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const setupEthers = (walletAddress) => {
    const web3Provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(web3Provider);
    setAccount(walletAddress);
    
    web3Provider.getSigner().then((web3Signer) => {
      setSigner(web3Signer);
    });

    // Escuta mudancas de conta
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setupEthers(accounts[0]);
      }
    });
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
  };

  return (
    <WalletContext.Provider value={{ account, provider, signer, connectWallet, disconnectWallet, isConnecting }}>
      {children}
    </WalletContext.Provider>
  );
};
