import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';


const TestLatencias = () => {
  const [numPings, setNumPings] = useState(5); // Número predeterminado de pings
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleRunTests = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/latency', {
        num_pings: parseInt(numPings, 10), // Convertir a número entero
        host: url,
      });
      console.log('Response data:', response.data); // Añade este log para inspeccionar la respuesta
      setResults(response.data);
    } catch (error) {
      console.error('Error running latency test:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="test-velocidad">
        <h1>Test de Latencias</h1>
        <div className="input-container">
          <input
            type="number"
            value={numPings}
            onChange={(e) => setNumPings(e.target.value)}
            placeholder="Número de pings a realizar"
            className="input-field"
          />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL a evaluar"
            className="input-field"
          />
          <button className="btn-submit" onClick={handleRunTests} disabled={loading}>
            {loading ? 'Ejecutando pruebas...' : 'Iniciar pruebas'}
          </button>
        </div>
      </div>
      {results && (
        <>
          <h2>Resultados</h2>
          <div className="results-container">
            <iframe
              className="graph-iframe"
              title="Latency Graph"
              srcDoc={results.avg_latency}
            />
            <iframe
              className="graph-iframe"
              title="Latency KPIs"
              srcDoc={results.latency_graph}
            />
          </div>
        </>
      )}
    </>
  );
};

export default TestLatencias;
