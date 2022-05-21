import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesDetail } from '../../Redux/Actions/actions.js';
import NavBar from '../NavBar/NavBar.js';
import './CountryDetail.css';

export default function CountryDetail(props){
    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getCountriesDetail(id))
    }, [dispatch, id]);

    const detailCountry = useSelector(state => state.countriesDetail);
    console.log(detailCountry)




return (
    <div  >
        <NavBar />
        <div key={id}>
            <h2>{detailCountry.id}</h2>
            <img src={detailCountry.flag} alt={detailCountry.name}/>
            <h1 className="texts">{detailCountry.name}</h1>
            <h1 className="texts">{detailCountry.continents}</h1>
            <h1 className="texts">{detailCountry.capital}</h1>
            <h1 className="texts">{detailCountry.subregion}</h1>
            <h1 className="texts">{new Intl.NumberFormat().format(detailCountry.area)} km<sub>2</sub></h1> 
             <h1 className="texts">{new Intl.NumberFormat().format(detailCountry.population)}</h1>
        </div>  
        <div>
            {
                detailCountry.activities && ( detailCountry.activities.map((a) => { 
                    return (
                        <div>
                                {a.name} ( time: {a.duration} dificulty: {a.dificulty} season: {a.season} ) 
                        </div>
                    )
                }))
            }   
            
        </div>            
    </div>
  )
};




