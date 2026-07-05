import React from 'react';
import AlertTable from './components/AlertTable';

function App() {
  return (
    <div className="dashboard-container">
      <header className="header">
        <div>
          <h1>Auditoria Imutável</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Painel Administrativo de Segurança - Registros em Blockchain
          </p>
        </div>
      </header>

      <main>
        <section className="glass-panel">
          <AlertTable />
        </section>
      </main>
    </div>
  );
}

export default App;
