import * as api from '../api/index.js';

import { GET_PRODUCTS, START_LOADING, END_LOADING, GET_PRODUCT } from '../constants/productConstants';





export const getProducts = () => async (dispatch) => {
  try {


    dispatch({type: START_LOADING})

    const { data } = await api.getProducts()
    dispatch({ type: GET_PRODUCTS, payload: data });
    dispatch({ type: END_LOADING });
  
    
  } catch (error) {
    console.log(error.response.data);
    
  }
}



export const deleteProduct = (id) => async (dispatch) => {
  try {

    const { data } = await api.deleteProduct(id)
   
  
    
  } catch (error) {
    console.log(error.response.data);
    
  }
}

export const updateProduct = () => async (dispatch) => {
  try {

    const { data } = await api.getProducts()
    dispatch({ type: GET_PRODUCTS, payload: data });
    dispatch({ type: END_LOADING });
  
    
  } catch (error) {
    console.log(error.response.data);
    
  }
}


export const getProductById = (id) => async(dispatch) => {
  try {

    dispatch({type: START_LOADING})
    const { data } =  await api.getProduct(id)

  

    dispatch({ type: GET_PRODUCT, payload: data });

    dispatch({ type: END_LOADING });





    
  } catch (error) {

    console.log(error.response.data);
    
  }
}