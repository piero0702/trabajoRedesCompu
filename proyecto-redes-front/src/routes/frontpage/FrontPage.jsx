import React from 'react'
import Header from '../../components/header/Header'
import './frontPageStyle.css'
import { Boxes } from "../../components/ui/background-boxes";
import { cn } from '../../../util/cn';
const FrontPage = () => {
  return (
    <>
    <Header/>
    <div className="h-100 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes/>
      <div className='front-page'>
          <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>Bienvenido al medidor de QoS del Grupo 3!</h1>
          <p className="text-center mt-2 text-neutral-300 relative z-20" >¡Evalúa la calidad de tu conexión a Internet con nuestro avanzado medidor de QoS (Calidad de Servicio)! Nuestro sistema te proporciona una visión detallada y precisa del rendimiento de tu red, ayudándote a comprender mejor tu conexión y optimizar tu experiencia en línea.</p>
      </div>
    </div>
    </>
  )
}

export default FrontPage