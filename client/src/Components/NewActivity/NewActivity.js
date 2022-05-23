import React from 'react'
import NavBar from '../NavBar/NavBar'
import { useState, useEffect } from "react";
 import { useSelector, useDispatch } from 'react-redux'
 import { createActivity, getCountries } from '../../Redux/Actions/actions.js'

 function validate(input) {
     const errors = {};
     if (!input.name) errors.name = "Please complete with a recipe name";
     if (!input.selecCountry.length) errors.selecCountry = "You must select at least one Country";
     return errors;
 }
 
function NewActivity() {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    //console.log("NEWACTIVITY:", countries)
    //const contriesName = countries.map(d => {return d.name})
    //console.log(contriesName)
    
    const [errors, setErrors] = useState({});
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
      //input.activitySelect.join()
      console.log(input)
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
    console.log(input)

    function handleChange(e) {
        e.preventDefault();
        setInput((prevInput) => {
          //// de esta manera el componente muestra los cambios (componentdidupdate?) para poder ir validando
          const newInput = {
            ...prevInput,
            [e.target.name]: e.target.value,
          };
          const validations = validate(newInput);
          setErrors(validations);
          return newInput;
        });
    }
    // function handleCheckBox(e) {
    //     console.log(e);
    // }
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
        <div>
          <NavBar />
          <div className="">
            <h1 className="">Crear su nueva receta!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              
                <div className="">
                    <label className="">Name:</label>
                     <input
                     className="inputs"
                     name="name"
                     type="text"
                     value={input.name}
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && <span className="errors">{errors.name}</span>}
                </div>
              
                <div className="">
                    <label className="">Dificultad:</label>
                    <p>Facil</p>
                    <p>Extremo</p>
                    <input type="range" min="1" max="5" defaultValue={"0"} name={'dificulty'}  onChange={(e)=> handleChange(e)}/>
                </div>
                
                <div className="">
                    <label className="">Duracion:</label>
                    <input type="range" min="0" max="48" defaultValue={"0"} name={'duration'}  onChange={(e)=> handleChange(e)}/>
                    <span> {input.duration} Horas</span>
                </div>

                <div className="">
                  <label className="">Temporada:</label>
                  <select name="season" onChange={(e)=> handleChange(e)}>
                  <option>Seleccione Temporada</option>
                    <option>Verano</option>
                    <option>Otoño</option>
                    <option>Invierno</option>
                    <option>Primavera</option>
                    <option>Todo el Año</option>
                  </select>
                </div>

                <div>
                  <div className="">
                    <label className="">Paises:</label>
                    <div className="">
                      <select name="select" onChange={(e) => agregarCountry(e)}><option>Seleccione Pais</option>
                        {countries?.map((e) => {
                          return (
                            <option key={e.id} value={e.id}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div style={{ border: "solid red" }} id="divContenedor" class="divCont"></div>
                </div>
               
              <button className="submitButton" type="submit">
                Submit Recipe
              </button>
             
            </form>
          </div>
        </div>
      );



}
export default NewActivity


