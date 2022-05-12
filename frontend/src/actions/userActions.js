import { AUTH, SET_ERROR  } from '../constants/userConstants';
import * as api from '../api/index.js';

export const login = (formData, navigate) => async (dispatch) => {

  const cart = JSON.parse(localStorage.getItem('cartItems'))


  try {
    const { data } = await api.login(formData);
    console.log(data)

    dispatch({ type: AUTH, data });


    if(cart) {
      navigate('/shipping')
    } else {
      navigate(-1)
    }


  
   ;
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.response })
  }
};



export const register = (formData, navigate) => async (dispatch) => {

  const cart = JSON.parse(localStorage.getItem('cartItems'))


  try {
    const { data } = await api.register(formData);
 

    dispatch({ type: AUTH, data });

    if(cart) {
      navigate('/shipping')
    } else {
      navigate('/')

    }

    
  } catch (err) {

    
    dispatch({ type: SET_ERROR, payload: err.response })
  }
};