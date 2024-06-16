import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import './testVelocidad.css';

const TestVelocidad = () => {
  const [numTests, setNumTests] = useState(5); // Número predeterminado de pruebas
  const [url, setUrl] = useState('example.com'); // URL predeterminada
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleRunTests = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/speedtest', {
        num_tests: parseInt(numTests), // Convertir a número entero
        url: url.trim() // Asegurar que la URL no tenga espacios innecesarios
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error running speed test:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="test-velocidad">
        <h1>Test de velocidad</h1>
        <div className="input-container">
          <input
            type="number"
            value={numTests}
            onChange={(e) => setNumTests(e.target.value)}
            placeholder="Número de pruebas a realizar"
            className="input-field"
          />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL para medir latencia"
            className="input-field"
          />
          <button className="btn-submit" onClick={handleRunTests} disabled={loading}>
            {loading ? 'Ejecutando pruebas...' : 'Iniciar pruebas'}
          </button>
        </div>
      </div>
      {results && (
        <div className="results-container">
          <h2>Resultados</h2>
          <div className="graph-container" dangerouslySetInnerHTML={{ __html: results.download_hist }} />
          <div className="graph-container" dangerouslySetInnerHTML={{ __html: results.upload_hist }} />
          <div className="graph-container" dangerouslySetInnerHTML={{ __html: results.speeds_time }} />
          <div className="graph-container" dangerouslySetInnerHTML={{ __html: results.avg_speeds }} />
          <div className="graph-container" dangerouslySetInnerHTML={{ __html: results.latency_hist }} />
          <div className="graph-container" dangerouslySetInnerHTML={{ __html: results.latency_box }} />
          <div className="graph-container" dangerouslySetInnerHTML={{ __html: results.max_min_avg_speeds }} />
          <div className="graph-container" dangerouslySetInnerHTML={{ __html: results.kpis }} />
        </div>
      )}
    </>
  );
};

export default TestVelocidad;
