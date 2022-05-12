import * as api from '../api/index.js';
import { GET_PRODUCTS, START_LOADING, END_LOADING, GET_PRODUCT, SET_ERROR } from '../constants/productConstants';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'
import { useDispatch, useSelector } from 'react-redux';






export const addToCart = (id,qty) => async (dispatch, getState) => {

  




    const { data } = await api.getProduct(id)

     dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.result[0].product_id,
      name: data.result[0].name,
      image: data.result[0].image,
      price:data.result[0].price,
      countInStock: data.result[0].countInStock,
      qty,
    }, 
  }) 

 
  localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))

  dispatch({type: 'END_LOADING'})

  
  
}
  

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    })
  
    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))
  }
   

  export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    })
  
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  }
  
  export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    })
  
    localStorage.setItem('paymentMethod', JSON.stringify(data))
  }
  