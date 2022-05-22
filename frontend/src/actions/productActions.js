import * as api from '../api/index.js';

import { GET_PRODUCTS, START_LOADING, END_LOADING, GET_PRODUCT, GET_REVIEWS, SET_ERROR, JUST_ADDED_REVIEW, GET_TOP_PRODUCTS, FETCH_BY_SEARCH } from '../constants/productConstants';





export const getProducts = (pageNumber) => async (dispatch) => {
  try {


    dispatch({type: START_LOADING})

    const { data } = await api.getProducts(pageNumber)
    dispatch({ type: GET_PRODUCTS, payload: data });
    dispatch({ type: END_LOADING });
  
    
  } catch (error) {
    console.log(error.response.data);
    
  }
}


export const getTopProducts = () => async (dispatch) => {
  try {


    

    const { data } = await api.getTopProducts()
    dispatch({ type: GET_TOP_PRODUCTS, payload: data });
    dispatch({ type: END_LOADING });
  
    
  } catch (error) {
    console.log(error.response.data);
    
  }
}








export const deleteProduct = (id) => async (dispatch) => {
  try {

    const { data } = await api.deleteProduct(id)
   
  
    
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.response })
    
  }
}

export const updateProduct = () => async (dispatch) => {
  try {

    const { data } = await api.getProducts()
    dispatch({ type: GET_PRODUCTS, payload: data });
    dispatch({ type: END_LOADING });
  
    
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.response })
    
  }
}


export const getProductById = (id) => async(dispatch) => {
  try {

    dispatch({type: START_LOADING})
    const { data } =  await api.getProduct(id)

    dispatch({ type: GET_PRODUCT, payload: data });


    dispatch({ type: END_LOADING });
} catch (err) {
  dispatch({ type: SET_ERROR, payload: err.response })
  }
}

export const getReviewsById = (id) => async(dispatch) => {
  try {

    dispatch({type: START_LOADING})
    const { data } =  await api.getReviews(id)
    dispatch({ type: GET_REVIEWS, payload: data });
    dispatch({ type: END_LOADING });
} catch (error) {
  console.log(error.response.data);
  }
}


export const addProductReview = (value, id) => async(dispatch) => {
  try {

    const { data } =  await api.addProductReview(value, id)

    dispatch({ type: JUST_ADDED_REVIEW });
    
  } catch (err) {

    dispatch({ type: SET_ERROR, payload: err.response })
    
  }
  
}

export const getProductsBySearch = (searchQuery, pageNumber) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
  


    //const { data: { data } } = await api.fetchPostsBySearch(indicator, searchItem);
    const { data } = await api.fetchProductsBySearch(searchQuery, pageNumber);
   
    dispatch({ type: FETCH_BY_SEARCH, payload: data  });
    dispatch({ type: END_LOADING });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.response })
   
  }
};