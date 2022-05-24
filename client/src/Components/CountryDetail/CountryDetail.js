import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesDetail } from '../../Redux/Actions/actions.js';
import NavBar from '../NavBar/NavBar.js';
import './CountryDetail.css';
import imagenFondo from "../../Img/pngcardid.png"
import logo from "../../Img/logoPi.png"
import bird from "../../Img/pngegg.png"
import { Link } from 'react-router-dom';


export default function CountryDetail(props){
    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getCountriesDetail(id))
    }, [dispatch, id]);

    const detailCountry = useSelector(state => state.countriesDetail);
    console.log(detailCountry)




return (
    <div className='conteinerCardId' key={id} >
        <NavBar />
        <div className='conteinerAllData'>
            <div className='cardIdleft'>
                <img className='imgFondo' src={imagenFondo} alt="alpinistaDeFondo"/>
                <div className='formaOne'></div>
                <div className='formaTwo'></div>
                <img className='imageCardId' src={detailCountry.flag} alt={detailCountry.name}/>
                <div className='conteinerTitle'>
                    <h1 className="textsTitle">{detailCountry.name}</h1>
                </div>
                <div className='containerId'>
                    <h2 className='idText'>{detailCountry.id}</h2>
                </div>
                <div className='conteinercapital'>
                    <h1 className="textsCpital">{detailCountry.capital}</h1>
                    <h3 className='capitaTitle'>Capial</h3>
                </div>
            </div>
            <div className='cardIdRight'>
                <div className="conteinerDataId">
                    <h3 className='titleDataId'>Continente</h3>
                    <h1 className="texts">{detailCountry.continents}</h1>
                    <h3 className='titleDataId'>Sub Region</h3>
                    <h1 className="texts">{detailCountry.subregion}</h1>
                    <h3 className='titleDataId'>Area</h3>
                    <h1 className="texts">{new Intl.NumberFormat().format(detailCountry.area)} km<sub>2</sub></h1> 
                    <h3 className='titleDataId'>Poblacion</h3>
                    <h1 className="texts">{new Intl.NumberFormat().format(detailCountry.population)}</h1>
                </div>
                <div className='conteinerActivities'>
                    {detailCountry.activities && ( detailCountry.activities.map((a) => { 
                        return (
                            <div>
                                <h2 className='activityNameId'>{a.name}</h2> 
                                <p className='textoDetalleAct'>Duracion: {a.duration} horas</p>
                                <p  className='textoDetalleAct'>Dificulta: {a.dificulty} (Facil 1 / Extremo 5)</p>
                                <p className='textoDetalleAct'>Temporada: {a.season}</p>
                            </div>
                        )
                    }))}  
                </div>
            </div>
            <div className='conteinerImages'>
                <img className='logoRigth' src={logo} alt="logo"/>
                <img className='logoRigthDos' src={bird} alt="bird"/>
            </div>
            <Link to={`/newActivity`}>
                <button className='buttonCardid'>Registra una Actividad</button>
            </Link>    
        </div>
    </div>
    
            
                 
                
                   
  )
};




