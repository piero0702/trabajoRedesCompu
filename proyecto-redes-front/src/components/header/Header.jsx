import React from 'react'
import './headerStyle.css'
const Header = () => {
  return (
    <>
        <div className='inicial'>
            <h3>Medidor QoS Grupo 3</h3>
            <a href="/"><button>Inicio</button></a>
            <a href="/testVelocidad"><button>Test de velocidad</button></a>
            <a href="/testLatencias"><button>Medición Latencias</button></a>
        </div>
    </>
  )
}

export default Header