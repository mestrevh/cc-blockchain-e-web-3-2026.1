import React, { useState, useEffect } from 'react';

const formatTimestamp = (unixSeconds) => {
  if (!unixSeconds) return 'N/A';
  const date = new Date(unixSeconds * 1000);
  return date.toLocaleString('pt-BR');
};

const AlertTable = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:3000/alerts');
        if (!response.ok) {
          throw new Error('Falha na resposta do servidor da API');
        }
        const data = await response.json();
        setAlerts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

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
