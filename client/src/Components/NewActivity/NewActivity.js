import React from 'react'
import NavBar from '../NavBar/NavBar'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { createActivity, getCountries } from '../../Redux/Actions/actions.js'
import logo from "../../Img/logoPi.png"
import logoDos from "../../Img/ISOLOGO_HENRY_BLACK.png"
import iconoUno from "../../Img/pngegg 16.png"
import iconoDos from "../../Img/pngegg 17.png"
import iconoTres from "../../Img/pngegg 18.png"


 

 import "./NewActivity.css"

 function validate(input) {
    const errors = {};
    if (!input.name) errors.name = "Debe tener un nombre la actividad";
    if (input.dificulty < 1 || input.dificulty > 5)
    errors.dificulty = "Debe tener una dificultad minima de 1 y maxima de 5 ";
    if (input.duration < 1 || input.duration > 48)
    errors.duration = "Debe tener una cantidad de horas minima de 1 y maxima de 48 "; 
    
    
      
     return errors;
 }
//  function dificultad(input){
//    const dificultadNum = {}
//    if(input.dificulty === 1) dificultadNum.dificulty = "Facil";
//    if(input.dificulty === 5) dificultadNum.dificulty = "Extremo";
//    return dificultadNum;
//  }
 
function NewActivity() {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    //console.log("NEWACTIVITY:", countries)
    //const contriesName = countries.map(d => {return d.name})
    //console.log(contriesName)
    
    const [errors, setErrors] = useState({});
    //const [dificultadNum, setDificultadNum ] = useState({});
    // const [input.activitySelect, setinput.activitySelect] = useState([]);
    const [input, setInput] = useState({
      name: "",
      dificulty: "",
      duration: "",
      season: "",
      selecCountry: "",
      activitySelect: [],
    });

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    function handleSubmit(e) {
      e.preventDefault();
      //console.log(input)
      if (Object.values(errors).length > 0) {
        alert("Por favor complete la información requerida.");
      } else if (
        input.name === "" &&
        input.dificulty === "" &&
        input.duration === "" &&
        !input.activitySelect.length
      ) {
        alert("Por favor complete el formulario.");
      } else {
        dispatch(createActivity(input));
        alert("Nueva Actividad agregada correctamente!");
        setInput({
          name: "",
          dificulty: "",
          duration: "",
          season: "",
          selecCountry: "",
          activitySelect: [],
      });
      limpiarDivContenedor()
      }
    }
    //console.log(input)

    function handleChange(e) {
        e.preventDefault();
        setInput((prevInput) => {
         
          const newInput = {
            ...prevInput,
            [e.target.name]: e.target.value,
          };
          const validations = validate(newInput);
          setErrors(validations);
          return newInput;
          
        });
    }
   
    function agregarCountry(e) {
      let activityNew = e.target.value.trim();
      if (!input.activitySelect.includes(activityNew)) {
        let toDivCountry = document.createElement("span");
        toDivCountry.className = "toDivCountry";
        toDivCountry.id = activityNew;
        toDivCountry.textContent = activityNew;
        let toButtonX = document.createElement("button");
        toButtonX.textContent = "X";
        toButtonX.className = "toDivX";
        toButtonX.id = `X${activityNew}`;
        toButtonX.addEventListener(
        "click",
        function () {
          deleteCountry(this.id.trim());
        },
        false
      );
      toDivCountry.appendChild(toButtonX);
      let toDivGral = document.getElementById("divContenedor");
      toDivGral.appendChild(toDivCountry);
      input.activitySelect.push(activityNew);
    }}
  
    function deleteCountry(id) {
      let posicion = input.activitySelect.indexOf(id.slice(1));
      if (posicion !== -1) {
        input.activitySelect.splice(posicion, 1);
      }
      let top = document.getElementById("divContenedor");
      let nested = document.getElementById(id.slice(1));
      let removido = top.removeChild(nested);
      console.log(removido);
      }
      function limpiarDivContenedor() {
        let toDivGral = document.getElementById("divContenedor");
        while (toDivGral.firstChild) {
          //The list is LIVE so it will re-index each call
          toDivGral.removeChild(toDivGral.firstChild);
        }
      }

    return (
        <div className='containerFomrRender'>
          <NavBar />
          <div className='conteinerForm'>
            <div className='fondoForm'>
              <div className='contanerTex'>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className='section'><span className='numForm'>1</span>Tipo de Actividad</div>
                  <div className="inner-wrap">
                    <input className="inputName" placeholder="Nombre" name="name" type="text" value={input.name} 
                    onChange={(e) => handleChange(e)}
                    />{errors.name && <span className="errors">{errors.name}</span>}
                  </div>
                  <div className="section"><span className='numForm'>2</span>Dificultad</div>
                  <div className='inner-wrap'>
                    <div>
                      <input  className='slider' type="range" min="1" max="5" defaultValue={"0"} name='dificulty' onChange={(e)=> handleChange(e)}/>{" "}
                      <span className='subTitleInput'> {input.dificulty?input.dificulty:0}</span>{errors.dificulty && (
                      <span className="errors">{errors.dificulty}</span>
                      )}
                      
                    </div>
                  </div>
                  <div className="section"><span className='numForm'>3</span>Duracion</div>
                  <div className="inner-wrap">
                    <input className='slider' type="range" min="1" max="48" defaultValue={"0"} name={'duration'}  onChange={(e)=> handleChange(e)}/>
                    <span className='subTitleInput'> {input.duration?input.duration:0} Horas</span>{errors.duration && (
                      <span className="errors">{errors.duration}</span>
                      )}
                  </div>
                  <div className="section"><span className='numForm'>4</span>Temporada</div>
                  <div className="inner-wrap">
                    <select name="season" onChange={(e)=> handleChange(e)}>
                      <option>Seleccione Temporada</option>
                      <option>Verano</option>
                      <option>Otoño</option>
                      <option>Invierno</option>
                      <option>Primavera</option>
                      <option>Todo el Año</option>
                    </select>
                  </div>
                  <div className="section"><span className='numForm'>5</span>Pais</div>
                  <div className="inner-wrap">
                    <select name="select" onChange={(e) => agregarCountry(e)}>
                      <option>Seleccione Pais</option>
                        {countries?.map((e) => {
                          return (
                            <option key={e.id} value={e.id}>
                              {e.name}
                            </option>
                          );
                        })}
                    </select>
                    <div className='divContenedorCountry' id="divContenedor" ></div>
                  </div>
                  <button className="submitButtonForm" type="submit">Crear Actividad</button>
                </form>
              </div>
                <div className='cardTextRigth'>
                  <h1 className='titleForm'>Registra tu Actividad</h1>
                  <img className='logoForm' src={logo} alt="logo"/>  .     
                  <img className='logoFormDos' src={logoDos} alt="logoHenry"/>
                  <div className='ContainerIcons'>
                  <a href="https://github.com/ivang111" target="_blank"
                rel="noopener noreferrer"><img className='iconoSocial' src={ iconoUno } alt="github"/></a>
                  <a href="https://www.linkedin.com/in/ivan-parra-casallas-91906a18a/" target="_blank"
                rel="noopener noreferrer"><img className='iconoSocial' src={ iconoDos } alt="Linkdlin"/></a>
                  <a href="https://www.instagram.com/dropmic.art/?hl=es" target="_blank"
                rel="noopener noreferrer"><img className='iconoSocial' src={ iconoTres } alt="Instagram"/></a>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      );



}
export default NewActivity


