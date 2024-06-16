import React from 'react'
import Header from '../../components/header/Header'
import './frontPageStyle.css'
const FrontPage = () => {
  return (
    <>
    <Header/>
    <div className='front-page'>
        <h1>Bienvenido al medidor de QoS del Grupo 3!</h1>
        <p>¡Evalúa la calidad de tu conexión a Internet con nuestro avanzado medidor de QoS (Calidad de Servicio)! Nuestro sistema te proporciona una visión detallada y precisa del rendimiento de tu red, ayudándote a comprender mejor tu conexión y optimizar tu experiencia en línea.</p>
    </div>
    </>
  )
}

export default FrontPage