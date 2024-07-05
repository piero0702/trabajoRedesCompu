import React from 'react'
import Header from '../../components/header/Header'
import './frontPageStyle.css'
import { Boxes } from "../../components/ui/background-boxes";
import { cn } from '../../../util/cn';
import { AnimatedTooltip } from "../../components/ui/animated-tooltip";
import pieroImage from '../../../public/pierofoto.png';
import alejandroImage from '../../../public/alefoto.png';
import valenImage from '../../../public/valenfoto.png';
import titsImage from '../../../public/titsfoto.png';
import { TextGenerateEffect } from "../../components/ui/text-generate-effect";

const words = `Bienvenido al medidor de QoS del Grupo 3!`;

const people = [
  {
    id: 1,
    name: "Valentina Sarango",
    designation: "20212544",
    image:
    valenImage,
  },
  {
    id: 2,
    name: "Piero Pizarro",
    designation: "20212108",
    image:
      pieroImage,
  },
  {
    id: 3,
    name: "Mauricio Cuentas",
    designation: "20213473",
    image:
    titsImage,
  },
  {
    id: 4,
    name: "Alejandro Cabero",
    designation: "20213320",
    image:
      alejandroImage,
  }
];
const FrontPage = () => {
  return (
    <>
    <Header/>
    <div className="h-100 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes/>
      <div className='front-page'>
      <TextGenerateEffect words={words} className={cn("md:text-4xl text-xl text-white relative z-20")} />          
      <p className="text-center mt-2 text-neutral-300 relative z-20" >¡Evalúa la calidad de tu conexión a Internet con nuestro avanzado medidor de QoS (Calidad de Servicio)! Nuestro sistema te proporciona una visión detallada y precisa del rendimiento de tu red, ayudándote a comprender mejor tu conexión y optimizar tu experiencia en línea.</p>
      </div>
      <h1 className={cn("md:text-4xl text-xl text-neutral-200 relative z-20")}>Integrantes del Grupo</h1>
      <br/>
      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={people} />
      </div>
    </div>
    </>
  )
}

export default FrontPage