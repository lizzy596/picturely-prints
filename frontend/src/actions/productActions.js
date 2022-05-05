import * as api from '../api/index.js';

import { ADD_PRODUCT, GET_PRODUCTS, START_LOADING, END_LOADING, ADMIN_EDIT_PRODUCT, ADMIN_DELETE_PRODUCT } from '../constants/productConstants';


/*export const addProduct = ({formData}) => async (dispatch) => {
    try {
  const { data } =  await api.add_Product({formData});
//dispatch({ type: ADD_PRODUCT, payload: data });
 //navigate(`/posts/${data._id}`);
    } catch (error) {
      console.log(error.response.data);
      console.log('loser')
    }
}; */


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