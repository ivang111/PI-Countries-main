import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar.js"
import "./Home.css"
import { getCountries, aplhabeticalSort, populationSort, filterContinent, filterActivity, getActivities } from "../../Redux/Actions/actions.js"
import Card from "../Card/Card.js"

import Search from '../../Components/Search/Search.js';


function Home() {
  //Todos los paises//
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  //console.log("HOME_ALL_ACTIVITYES", countries )
  const [order, setOrder] = useState("");
  
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  //console.log("TABLAPAISESBD:", countries)

 useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);
  //console.log("TABLAACTIVIDADES:", activities)

  //Paginado//
  const [page, setPage] = useState(1);
  const [coutriesPage, setCountriesPage] = useState(9);

  const countryPag = page * coutriesPage;
  const firstRecipePage = countryPag - coutriesPage;
  const countriesByPage = countries.slice(firstRecipePage, countryPag);
  const maxPages = Math.ceil(countries.length / coutriesPage);
  //console.log("PAGINADO_HOME:"countriesByPage)

  function pageNum(e) {
    alert(page);
    document.getElementById("paginas").innerText = `Página ${page}`;
    setPage(page);
  }
  function anterior() {
    if (page > 1) {
      document.getElementById("paginas").innerText = `Página ${page - 1}`;
      setPage(page - 1);
    }
  }
  function siguiente() {
    if (page * coutriesPage + page <= countries.length) {

      document.getElementById("paginas").innerText = `Página ${page + 1}`;
      setPage(page + 1);
    }
  }
  const handlePageChange = (e) => {
    document.getElementById("paginas").innerText = `Página ${e.target.value}`;
    document.getElementById("unadetantas").innerText = ` /${maxPages}`;
    e.target.value ? setPage(e.target.value) : setPage(1);
  };
  //Ordenamiento A-Z//
  function orderAZ(e) {
    e.preventDefault();
    dispatch(aplhabeticalSort(e.target.textContent.trim()));
    setPage(1);
    setOrder(e.target.textContent.trim());
  }
  function orderPopulation(e) {
    e.preventDefault();
    setPage(1);
    dispatch(populationSort(e.target.textContent.trim()));
    setOrder(e.target.textContent.trim());
  }
  //Filtrado por continente//
  function handleContinentChange(e) {
    e.preventDefault();
    setPage(1);
    if(e.target.value === 'all') return dispatch(getCountries())
    //console.log("FILTRO1:", e.target.value)
    dispatch(filterContinent(e.target.value.trim()));
    setOrder(e.target.value.trim());
  };
  //Filtrado por actividad//
  function handleActivityChange(e) {
    e.preventDefault();
    setPage(1);
    if(e.target.value === 'all') return dispatch(getCountries())
    console.log("FILTRO2:", e.target.value)
    dispatch(filterActivity(e.target.value.trim()));
    setOrder(e.target.value.trim());
    };

return (
    <>
    <div className='conteinerTop'>
      <NavBar />
      <div className='banner1'>
        <div className='containerButtons'>
          <Search />
          <div className="orderAlphabeticButton">
            <button onClick={(e) => orderAZ(e)}>A-Z</button>
            <button onClick={(e) => orderAZ(e)}>Z-A</button>
          </div>
          <div className="ordenPopulationButton">
            <button onClick={(e) => orderPopulation(e)}>Min-Max</button>
            <button onClick={(e) => orderPopulation(e)}>Max-Min</button>
          </div>
          <div className="div1">
            <label>Filter by Continent: </label>
              <select name="continents" placeholder='select...' onChange={(e)=> handleContinentChange(e)} >
                
                <option value="all">all</option> 
                <option value="Africa">Africa</option> 
                <option value="Americas">Americas</option>
                <option value="Antarctic">Antarctic</option> 
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option> 
                <option value="Oceania">Oceania</option>    
            </select> 
          </div>
          <div>
            <label>Filter by Actividad: </label>
            <select name='actividades' placeholder='Selecciione Actividad' onChange={(e)=> handleActivityChange(e)}>
              <option value="all">all</option>
              {activities?.map((e) => { return (
              <option key={e.id} value={e.name}>{e.name}</option>
              );})}
            </select>
            {/* <div style={{ border: "solid black" }} id="divContenedor" class="divCont"></div>   */}
          </div>
        </div>
      </div>
      <div >
        <div className='containerCardsApp'>
          {countriesByPage.map(d => <Card
            key={d.id}
            id={d.id}
            flag={d.flag} 
            name={d.name}
            continents={d.continents}
            activities={d.activities}
          />)}    
        </div> 
        <div className="div1">
          <button onClick={(e) => anterior(e)}>Anterior</button>
          <button onClick={(e) => siguiente(e)}>Siguiente</button>
        </div>
        <div className="div1">
        <input
          id="paginadoNumerico"
          type="number"
          min="1"
          max={maxPages}
          onChange={handlePageChange}
        />

        <span id="unadetantas"> / {page >= 1 ? maxPages : maxPages + 1}</span>
      </div>
          <span id="paginas">Página 1</span>
        </div>
    </div>
    </>
  )
}

export default Home
