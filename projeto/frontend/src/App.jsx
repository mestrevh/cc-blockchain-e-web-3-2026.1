import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import AlertTable from './components/AlertTable';
import IdentitiesList from './pages/IdentitiesList';
import { WalletProvider, useWallet } from './contexts/WalletContext';

const Sidebar = () => {
  const location = useLocation();
  const { account, disconnectWallet } = useWallet();

  if (!account) return null; // Não mostra barra se não estiver logado

  const navItemStyle = (path) => ({
    display: 'block',
    padding: '1rem',
    textDecoration: 'none',
    color: location.pathname === path ? 'var(--accent)' : 'var(--text-main)',
    borderLeft: location.pathname === path ? '3px solid var(--accent)' : '3px solid transparent',
    backgroundColor: location.pathname === path ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    transition: 'all 0.2s'
  });

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Shield<span style={{color: 'var(--accent)'}}>Chain</span></h2>
      </div>
      <nav style={styles.nav}>
        <Link to="/" style={navItemStyle('/')}>Auditoria Geral</Link>
        <Link to="/identities" style={navItemStyle('/identities')}>Gerir Identidades</Link>
      </nav>
      <div style={styles.walletInfo}>
        <div style={styles.walletAddress}>
          {account.substring(0, 6)}...{account.substring(38)}
        </div>
        <button onClick={disconnectWallet} style={styles.logoutBtn}>Desconectar</button>
      </div>
    </aside>
  );
};

const ProtectedRoute = ({ children }) => {
  const { account, connectWallet } = useWallet();
  if (!account) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Acesso Restrito</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Conecte sua carteira para gerenciar identidades.</p>
        <button onClick={connectWallet} style={styles.logoutBtn}>Conectar MetaMask</button>
      </div>
    );
  }
  return children;
};

function AppContent() {
  const { account } = useWallet();

  return (
    <BrowserRouter>
      <div style={styles.layoutLoggedIn}>
        <Sidebar />
        <main style={styles.main}>
          <header className="header" style={styles.header}>
            <div>
              <h1>Auditoria Imutável</h1>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Painel Administrativo de Segurança - Registros em Blockchain
              </p>
            </div>
            {!account && (
              <button 
                onClick={connectWallet}
                style={{
                  ...styles.logoutBtn,
                  backgroundColor: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  fontWeight: 'bold',
                  width: 'auto'
                }}
              >
                🦊 Conectar Carteira
              </button>
            )}
          </header>
          <div style={styles.content}>
            <Routes>
              <Route 
                path="/" 
                element={
                  <section className="glass-panel">
                    <AlertTable />
                  </section>
                } 
              />
              <Route 
                path="/identities" 
                element={
                  <ProtectedRoute>
                    <IdentitiesList />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}

const styles = {
  layoutLoggedIn: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    minHeight: '100vh',
  },
  sidebar: {
    backgroundColor: 'var(--bg-panel)',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    padding: '2rem 1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  nav: {
    flex: 1,
    paddingTop: '1rem',
  },
  walletInfo: {
    padding: '1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  walletAddress: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '0.5rem',
    borderRadius: '4px',
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  logoutBtn: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: 'transparent',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'var(--text-main)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
  content: {
    padding: '2rem',
    flex: 1,
  }
};

export default App;
