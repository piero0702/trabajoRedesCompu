import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import { Boxes } from '../../components/ui/background-boxes';
import './TestLatencias.css';
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleRunTests();
    }
  };

  return (
    <>
      <Header />
      <div className="h-100 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes/>
        <CardContainer className="inter-var w-full max-w-[800px] mx-auto">
          <CardBody className="bg-[#2c2640] relative group/card w-full h-auto rounded-xl p-10 border border-gray-300 shadow-lg">
              <CardItem translateZ="50" className="text-xl font-bold text-[#b19cd9]">
                <h1>Test de Latencias</h1>
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <div className="input-container">
                  <input
                    type="number"
                    value={numPings}
                    onChange={(e) => setNumPings(e.target.value)}
                    placeholder="Número de pings a realizar"
                    className="input-field"
                    onKeyPress={handleKeyPress}
                  />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="URL a evaluar"
                    className="input-field"
                    onKeyPress={handleKeyPress}
                  />
                  <button className="btn-submit" onClick={handleRunTests} disabled={loading}>
                    {loading ? 'Ejecutando pruebas...' : 'Iniciar pruebas'}
                  </button>
                </div>
              </CardItem>
          </CardBody>
        </CardContainer>
        {results && (
          <>
        <h2 className='results relative z-20 text-4xl font-bold tracking-normal'>Resultados</h2>
        <div className="results-container relative z-20">
              <iframe
                className="graph-iframe"
                title="Latency Graph"
                srcDoc={results.avg_latency}
                style={{ borderRadius: "8px" }}
              />
              <iframe
                className="graph-iframe"
                title="Latency KPIs"
                srcDoc={results.latency_graph}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TestLatencias;
