import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { ethers } from 'ethers';
import identityRegistryAbi from '../abi/IdentityRegistry.json';

const IDENTITY_REGISTRY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const IdentitiesList = () => {
  const { account, signer } = useWallet();
  const [identities, setIdentities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [doc, setDoc] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileKey, setFileKey] = useState(Date.now());
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Pega a string base64 que o FileReader gera
        setPhotoBase64(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName('');
      setPhotoBase64('');
    }
  };

  const generateHash = (text) => {
    return ethers.sha256(ethers.toUtf8Bytes(text));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!photoBase64) {
      alert("Por favor, selecione uma foto.");
      return;
    }
    setIsSubmitting(true);
    
    try {
      const nameHash = generateHash(name);
      const docHash = generateHash(doc);
      const photoHash = generateHash(photoBase64);

      if (!signer) {
        alert("Signer não encontrado. Carteira não está completamente conectada.");
        return;
      }

      // Conecta diretamente ao contrato através do MetaMask (Web3 nativo)
      const contract = new ethers.Contract(IDENTITY_REGISTRY_ADDRESS, identityRegistryAbi.abi, signer);
      
      const tx = await contract.registerIdentity(nameHash, docHash, photoHash, isResident);
      
      alert('Transação enviada para o MetaMask! Aguardando confirmação da blockchain...');
      await tx.wait(); // Espera o bloco ser minerado

      alert('Identidade registrada com sucesso na Blockchain!');
      setName('');
      setDoc('');
      setPhotoBase64('');
      setFileName('');
      setFileKey(Date.now()); // Força a recriação do input file para limpar o cache do navegador
      fetchIdentities(); // Refresh list
    } catch (error) {
      console.error('Erro ao registrar:', error);
      // Tenta extrair a mensagem de erro específica do Smart Contract (ex: IdentityAlreadyExists)
      let reason = "Erro na comunicação com a Blockchain ou transação rejeitada.";
      if (error.reason) reason = error.reason;
      else if (error.data && error.data.message) reason = error.data.message;
      else if (error.message) reason = error.message;
      
      if (reason.includes("IdentityAlreadyExists")) {
        alert("Erro: Este Documento (CPF/RG) já está cadastrado para sua carteira!");
      } else {
        alert(`Erro na transação:\n${reason}`);
      }
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
            <label>Evidência Fotográfica</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={styles.fileUploadBtn}>
                📸 Selecionar Arquivo
                <input key={fileKey} required type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              </label>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {fileName ? fileName : 'Nenhum arquivo selecionado'}
              </span>
            </div>
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
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontFamily: 'monospace',
  },
  fileUploadBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s'
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
