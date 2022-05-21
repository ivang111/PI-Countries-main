import React from 'react'
import initialImg from "../../Img/initialImg.png"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch,  } from "react-redux";
import { startCountries } from "../../Redux/Actions/actions.js"
import "./Welcome.css"


function Welcome() {
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(startCountries());
  }, [dispatch]);
//console.log(startCountries)
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
