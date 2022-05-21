import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar.js"
import "./Home.css"
import { getCountries, aplhabeticalSort, populationSort, filterContinent } from "../../Redux/Actions/actions.js"
import Card from "../Card/Card.js"
import Search from '../../Components/Search/Search.js';


function Home() {
  //Todos los paises//
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [order, setOrder] = useState("");
  
  
  
 
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  console.log(countries)
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
  console.log("FILTRO1:", e.target.value)
    dispatch(filterContinent(e.target.value.trim()));
    setOrder(e.target.value.trim());
};

return (
    <>
    <div>
      <NavBar />
      <div>
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
          <p>
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
          </p>
      </div>
      </div>
      <div className='conteinerTop'>
        <div className='containerCardsApp'>
          {countriesByPage.map(d => <Card
            key={d.id}
            id={d.id}
            flag={d.flag} 
            name={d.name}
            continents={d.continents}
          />)}    
        </div> 
        <div className="div1">
          <button onClick={(e) => anterior(e)}>Anterior</button>
          <button onClick={(e) => siguiente(e)}>Siguiente</button>
        </div>
          <span id="paginas">Página 1</span>
        </div>
    </div>
    </>
  )
}

export default Home
