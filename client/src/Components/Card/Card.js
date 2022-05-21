import React from 'react'
import "./Card.css"
import imageTop from "../../Img/pngeggcard1.png"
import { Link } from 'react-router-dom';

 const CountryCard = ({id, name, flag, continents }) => {

  return (
    <div className='conteinerCard'>
      <div className='conteinrData'>
        <img className='imageTop' src={imageTop} alt="imageTo" />
        <h1 className='titleCard'>{name}</h1>
        <h2 className='idCard'>{id}</h2>
        <div className='conteinrSubData'>
          <p className='pText'>{continents}</p>
          <p className='pTitle'>Continente</p>
        </div>
        <div className='containerButton'>
          <Link to={`/country/${id}`}>
            <button className='buttonCard1'>Mas Info</button>
          </Link>
          <Link to={`/newActivity`}>
            <button className='buttonCard'>Registra tu Actividad</button>
          </Link>    
        </div>
      </div>
      <img className='recipeImg' src={flag} alt={name} />
    </div>
  );

}

export default CountryCard
