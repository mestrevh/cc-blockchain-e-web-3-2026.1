import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';

const formatTimestamp = (unixSeconds) => {
  if (!unixSeconds) return 'N/A';
  const date = new Date(unixSeconds * 1000);
  return date.toLocaleString('pt-BR');
};

const AlertTable = () => {
  const { account } = useWallet();
  const [alerts, setAlerts] = useState([]);
  const [identities, setIdentities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdentities = async () => {
      if (!account) return [];
      try {
        const response = await fetch(`http://localhost:3000/identities/wallet/${account}`);
        if (response.ok) {
          const data = await response.json();
          const hashes = data.map(id => id.identityHash);
          setIdentities(hashes);
          return hashes;
        }
      } catch (e) {
        console.error('Erro ao buscar identidades', e);
      }
      return [];
    };

    const fetchAlerts = async (isBackgroundRefresh = false) => {
      try {
        const userHashes = await fetchIdentities();

        const response = await fetch('http://localhost:3000/alerts');
        if (!response.ok) {
          throw new Error('Falha na resposta do servidor da API');
        }
        const data = await response.json();
        
        // Filtra os alertas para focar apenas nas identidades do usuario (se ele tiver alguma)
        // Se a carteira nao tiver identidades cadastradas, exibe tudo ou nada?
        // A regra diz: "Auditoria Imutavel deve focar apenas nos contratos adicionados pelo usuario"
        const filteredData = data.filter(alert => userHashes.includes(alert.identityHash));

        // Garante que os registros mais recentes (maior ID) fiquem no topo da tabela
        const sortedData = filteredData.sort((a, b) => b.id - a.id);
        setAlerts(sortedData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        if (!isBackgroundRefresh) {
          setLoading(false);
        }
      }
    };

    // Chamada inicial (com tela de loading)
    fetchAlerts(false);

    // Short Polling: recarrega os dados silenciosamente a cada 5 segundos
    const intervalId = setInterval(() => {
      fetchAlerts(true);
    }, 5000);

    // Cleanup para evitar memory leak quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, [account]);

  if (loading) {
    return (
      <div className="loading-state">
        <p>Sincronizando com a Blockchain...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>Servidor Indisponível</h2>
        <p>A API do Backend não está respondendo. Certifique-se de que a Etapa 2 (NestJS) está rodando.</p>
        <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>Detalhe: {error}</p>
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="empty-state">
        <h3>Nenhum Alerta Registrado</h3>
        <p>O livro-caixa de auditoria está vazio no momento.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Câmera</th>
            <th>Momento (Borda)</th>
            <th>Tipo de Alerta</th>
            <th>Hash (Evidência LGPD)</th>
            <th>Momento (Rede)</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td>#{alert.id}</td>
              <td style={{ fontWeight: 600 }}>{alert.cameraId}</td>
              <td>{formatTimestamp(alert.timestamp)}</td>
              <td>
                <span className="alert-type">
                  {alert.alertType.replace(/_/g, ' ')}
                </span>
              </td>
              <td className="hash-cell" title={alert.imageHash}>
                {alert.imageHash.substring(0, 10)}...{alert.imageHash.substring(58)}
              </td>
              <td>{formatTimestamp(alert.blockTimestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertTable;
