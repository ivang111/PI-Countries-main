import React from 'react'
import initialImg from "../../Img/initialImg.png"
import "./Welcome.css"




function Welcome() {
  return (
    <>
    <div className='conteinerWelcome'>
        <img className='imageBlur' src={initialImg} alt="imageInitial" />
        <span className='txtAdventure'>
            <h2>Aventura</h2>
        </span>
        <div className='containerTxt'>
            <p className='tituloTxt'>Ecoturismo y Actividades</p><br/>
            <p className='subTxt'>Busca y registra nuevas acitividades ecologicas alrededor del MUNDO </p>
        </div>
        <div className='containerButtonGo'>
            <button >Let's GO</button>
        </div>
        
       
    </div>
    </>
  )
}

export default Welcome
