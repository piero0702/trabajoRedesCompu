import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import './testVelocidad.css';

const TestVelocidad = () => {
  const [numTests, setNumTests] = useState(5); // Número predeterminado de pruebas
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleRunTests = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/speedtest', {
        num_tests: parseInt(numTests) // Convertir a número entero
      });
      console.log('Response data:', response.data); // Añade este log para inspeccionar la respuesta
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
              title="KPIs"
              srcDoc={results.kpis}
            />
            <iframe
              className="graph-iframe"
              title="Speeds Time"
              srcDoc={results.speeds_time}
            />
            <iframe
              className="graph-iframe"
              title="Download Histogram"
              srcDoc={results.download_hist}
            />
            <iframe
              className="graph-iframe"
              title="Upload Histogram"
              srcDoc={results.upload_hist}
            />
            <iframe
              className="graph-iframe"
              title="Average Speeds"
              srcDoc={results.avg_speeds}
            />
            <iframe
              className="graph-iframe"
              title="Max Min And Average Speeds"
              srcDoc={results.max_min_avg_speeds}
            />
          </div>
        </>
      )}
    </>
  );
};

export default TestVelocidad;
