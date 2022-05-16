// Importa las action types acá
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL } from "../actions";

const initialState = {
  products: [],
  productDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
            if (state.products.length === 0) {
                return {
                    ...state, 
                    products: action.payload}
            }
            else{
                return{
                    ...state,
                }
           }
    case GET_PRODUCT_DETAIL:
            return{
                ...state,
                productDetail: action.payload
            }
    case CREATE_PRODUCT:
           return{
               ...state,
               products: [...state.products, action.payload]
           }
    case DELETE_PRODUCT:
            return{
                ...state,
                products: state.products.filter(u => u.id !== action.payload)
            }
        default: return { ...state }
       

  }
};

export default rootReducer;
