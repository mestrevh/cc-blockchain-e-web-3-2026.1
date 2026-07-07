import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { ethers } from 'ethers';

const IdentitiesList = () => {
  const { account } = useWallet();
  const [identities, setIdentities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State (Texto Claro)
  const [name, setName] = useState('');
  const [doc, setDoc] = useState('');
  const [photo, setPhoto] = useState('');
  const [isResident, setIsResident] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchIdentities = async () => {
    if (!account) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/identities/wallet/${account}`);
      if (response.ok) {
        const data = await response.json();
        setIdentities(data);
      }
    } catch (error) {
      console.error('Erro ao buscar identidades:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdentities();
  }, [account]);

  const generateHash = (text) => {
    return ethers.sha256(ethers.toUtf8Bytes(text));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const nameHash = generateHash(name);
      const docHash = generateHash(doc);
      const photoHash = generateHash(photo);

      const response = await fetch('http://localhost:3000/identities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameHash,
          docHash,
          photoHash,
          isResident
        }),
      });
      if (response.ok) {
        alert('Identidade registrada com sucesso na Blockchain!');
        setName('');
        setDoc('');
        setPhoto('');
        fetchIdentities(); // Refresh list
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro na comunicação com o servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!account) {
    return <div className="glass-panel"><p>Conecte sua carteira para ver suas identidades.</p></div>;
  }

  return (
    <div style={styles.container}>
      <div className="glass-panel" style={styles.formPanel}>
        <h3>Cadastrar Nova Identidade</h3>
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Nome Completo</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: João da Silva" style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label>Documento (CPF/RG)</label>
            <input required type="text" value={doc} onChange={e => setDoc(e.target.value)} placeholder="Ex: 123.456.789-00" style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label>Evidência Fotográfica (URL ou Base64)</label>
            <input required type="text" value={photo} onChange={e => setPhoto(e.target.value)} placeholder="URL ou dado da foto" style={styles.input} />
          </div>
          <div style={styles.checkboxGroup}>
            <input type="checkbox" id="isResident" checked={isResident} onChange={e => setIsResident(e.target.checked)} />
            <label htmlFor="isResident">É Morador? (Sem validade)</label>
          </div>
          <button type="submit" disabled={isSubmitting} style={styles.button}>
            {isSubmitting ? 'Registrando...' : 'Registrar na Blockchain'}
          </button>
        </form>
      </div>

      <div className="glass-panel" style={styles.listPanel}>
        <h3>Minhas Identidades Cadastradas</h3>
        {loading ? (
          <p>Carregando da blockchain...</p>
        ) : identities.length === 0 ? (
          <p>Nenhuma identidade encontrada para esta carteira.</p>
        ) : (
          <ul style={styles.list}>
            {identities.map((id, index) => (
              <li key={index} style={{
                ...styles.listItem,
                borderLeft: id.role === 1 ? '4px solid #10b981' : '4px solid #f59e0b'
              }}>
                <div style={styles.listHeader}>
                  <span style={styles.badge}>{id.role === 1 ? 'Morador' : 'Visitante'}</span>
                  <span style={styles.date}>Criado em: {new Date(id.createdAt * 1000).toLocaleString()}</span>
                </div>
                <div style={styles.hashInfo}>
                  <small><strong>Identity Hash:</strong> {id.identityHash}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
  },
  formPanel: {
    padding: '2rem',
  },
  listPanel: {
    padding: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontFamily: 'monospace',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  button: {
    backgroundColor: 'var(--accent)',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: '1rem',
    borderRadius: '0 8px 8px 0',
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  date: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  hashInfo: {
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    wordBreak: 'break-all',
  }
};

export default IdentitiesList;
