import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';

const ConnectWallet = () => {
  const { account, connectWallet, isConnecting } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      navigate('/');
    }
  }, [account, navigate]);

  return (
    <div style={styles.container}>
      <div className="glass-panel" style={styles.card}>
        <div style={styles.iconWrapper}>
          🦊
        </div>
        <h2 style={styles.title}>Acesso Restrito</h2>
        <p style={styles.subtitle}>
          Conecte sua carteira MetaMask para gerenciar identidades e auditar registros na Blockchain.
        </p>
        <button 
          onClick={connectWallet} 
          disabled={isConnecting}
          style={styles.button}
        >
          {isConnecting ? 'Conectando...' : 'Conectar Carteira'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
  },
  card: {
    maxWidth: '400px',
    textAlign: 'center',
    padding: '3rem 2rem',
  },
  iconWrapper: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: 'var(--text-main)',
  },
  subtitle: {
    color: 'var(--text-muted)',
    marginBottom: '2rem',
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },
  button: {
    backgroundColor: 'var(--accent)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s',
  }
};

export default ConnectWallet;
