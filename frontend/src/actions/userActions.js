import { AUTH, SET_ERROR  } from '../constants/userConstants';
import * as api from '../api/index.js';

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    console.log(data)

    dispatch({ type: AUTH, data });

   navigate('/');
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.response })
  }
};



export const register = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
 

    dispatch({ type: AUTH, data });

    navigate('/')
  } catch (err) {

    
    dispatch({ type: SET_ERROR, payload: err.response })
  }
};