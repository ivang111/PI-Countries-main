import axios from 'axios';
import { LOCAL_HOST, GET_ALL_COUNTRIES, GET_COUNTRIES_DETAIL,  SEARCH_BY_NAME, ALPHABETICAL_SORT, POPULATION_SORT, FILTER_CONTINENT, GET_ALL_ACTIVITIES, CREATE_ACTIVITY } from "../AtionTypes"


//Crea la tabla BD//
export  function  startCountries() {
    return async function (dispatch){
        await axios.get(`${LOCAL_HOST}/api/countries/start`)
        .then((r) => {
            //console.log("START_DATA:", r);
            return  "OK"
        })
        .catch((error) => {
            console.log(error);
        });
    };
}
//Trae todos los pises de BD//
export  function  getCountries() {
    return async function (dispatch){
        await axios.get(`${LOCAL_HOST}/api/countries/`)
        .then((r) => {
            return dispatch({ 
                type: GET_ALL_COUNTRIES, 
                payload: r.data 
            });
        })
        .catch((error) => {
            console.log(error);
        });
    };
}
//Tre el detalle por ID y la relacion Actividad//
export function getCountriesDetail(id) {
    return async function(dispatch) {
        const response = await axios.get(`${LOCAL_HOST}/api/countries/`+id) 
        // console.log("DATA ID:", response)
        return dispatch({
               type: GET_COUNTRIES_DETAIL,
               payload: response.data,
            })
        }
} 
//Busqueda por nombre//
export function searchByName(name) {
    return async function (dispatch) {
      try {
        let response = await axios.get(`${LOCAL_HOST}/api/countries?name=${name}`);
        return dispatch({ type: SEARCH_BY_NAME, payload: response.data });
      } catch (error) {
        return alert("The country is not found");
      }
    };
}
//Ordena alfabeticamente//
export function aplhabeticalSort(payload) {
    return {
      type: ALPHABETICAL_SORT,
      payload,
    };
  }
//Ordena por poblacion//
export function populationSort(payload) {
    return {
      type: POPULATION_SORT,
      payload,
    };
  }
//Filtrado por continente//  
export function filterContinent(continente) {
    //console.log("ACTIONFILTER:", continente)
    return {
        type: FILTER_CONTINENT,
        payload: continente, 
    }
} 
//trae todas las actividades//
export  function  getActivities() {
    return async function (dispatch){
        await axios.get(`${LOCAL_HOST}/api/activities/`)
        .then((r) => {
            return dispatch({ 
                type: GET_ALL_ACTIVITIES, 
                payload: r.data 
            });
        })
        .catch((error) => {
            console.log(error);
        });
    };
}
//Crea actividad nueva//
export function createActivity(payload){
    return async function (dispatch) {
        try{
            const response = await axios.post(`${LOCAL_HOST}/api/activities/`, payload)
            return dispatch({
                type: CREATE_ACTIVITY,
                payload: response.data,
            })

        }catch(error){
            console.log(error)
        }
    }
}





