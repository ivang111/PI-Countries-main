import React from 'react'
import initialImg from "../../Img/initialImg.png"
import { Link } from "react-router-dom"
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
        <Link to="/home" id="click">
            <div className='containerButtonGo'>
                <button className='buttonHome'>Inicia el Recorrido</button>
            </div>
        </Link>
    </div>
    </>
  )
}

export default Welcome
