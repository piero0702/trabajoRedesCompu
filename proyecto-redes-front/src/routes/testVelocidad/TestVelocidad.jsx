import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import { Boxes } from '../../components/ui/background-boxes';
import './testVelocidad.css';
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
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
                <h1>Test de velocidad</h1>
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <div className="input-container flex flex-col items-center">
                  <input
                    type="number"
                    value={numTests}
                    onChange={(e) => setNumTests(e.target.value)}
                    placeholder="Número de pruebas a realizar"
                    className="input-field p-3 mb-4 w-full max-w-[400px] bg-[#6c5b7b] text-[#2c2640] rounded-lg"
                    onKeyPress={handleKeyPress}
                  />
                  <button className="btn-submit p-3 w-full max-w-[200px] bg-[#b19cd9] rounded-lg hover:bg-white transition-colors" onClick={handleRunTests} disabled={loading}>
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
      </div>
    </>
  );
};

export default TestVelocidad;
