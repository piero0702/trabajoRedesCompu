import React from 'react'
import Header from '../../components/header/Header'
import './testLatencias.css'
const TestLatencias = () => {
  return (
    <>
      <Header/>
      <div className="test-velocidad">
        <h1>Test de Latencias</h1>
        <div className="input-container">
          <input type="number" placeholder='Número de pings' className="input-field" />
          <input type="url" placeholder='URL a evaluar' className="input-field" />
          <button className="btn-submit">Iniciar pruebas</button>
        </div>
      </div>
    </>
  )
}

export default TestLatencias
