import { GET_ALL_COUNTRIES, GET_COUNTRIES_DETAIL, SEARCH_BY_NAME, ALPHABETICAL_SORT, POPULATION_SORT, FILTER_CONTINENT, GET_ALL_ACTIVITIES, CREATE_ACTIVITY } from "../AtionTypes";

const initialState = {
  countries: [],
  countriesDetail: [],
  activities: [],
  allCountries: [],
  
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
   case GET_ALL_COUNTRIES:
        return {
            ...state,
            countries: action.payload,
            allCountries: action.payload,
        }
   case GET_COUNTRIES_DETAIL:
       //console.log(action.payload)
        return{
            ...state,
            countriesDetail: action.payload
        }
    case SEARCH_BY_NAME:
        return {
            ...state,
            countries: action.payload,
          };
    case ALPHABETICAL_SORT:
        let sortCountries = [...state.countries];
        sortCountries =  action.payload === "A-Z"
            ? state.countries.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
                })
            : state.countries.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                return 0;
                });
        return {
            ...state,
            countries: sortCountries,
            }; 
    case POPULATION_SORT :
        let sortByPopulation = [...state.countries];
        sortByPopulation = 
            action.payload === "Min-Max"
            ? state.countries.sort(function (a, b) {
                return a.population - b.population 
                })
            : state.countries.sort(function (a, b) {
                return b.population - a.population 
                      });
            return {
                ...state,
                countries: sortByPopulation,
                };            
        case FILTER_CONTINENT:
            const allCountries = state.allCountries;
            console.log("REDUCER_DATA:", action.payload)
            // const filterByContinete = allCountries.filter((r) =>
            // r.continents?.includes((d) => d.toLowerCase() === action.payload.toLowerCase()
            // ));
            let filterByContinete =  allCountries.filter((e) =>
            e.continents.toLowerCase().includes(action.payload.toString().toLowerCase())
      );
            
            return { 
                ...state,
                    countries: filterByContinete,
            }
        case GET_ALL_ACTIVITIES:
            return{
                    ...state,
                    activities: action.payload 
            }         
        case CREATE_ACTIVITY:
            return{
                    ...state,
                    activities: [...state.activities, action.payload]
            }
        default:
            return {
                    ...state
            }
}};

export default rootReducer;
