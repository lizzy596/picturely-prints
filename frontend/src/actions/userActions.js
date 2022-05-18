import { AUTH, SET_ERROR, UPDATE_USER_DETAILS, START_LOADING, 
  END_LOADING, SET_SUCCESS,
  GET_ALL_USERS,
  ADMIN_EDIT_USER, 
  ADMIN_DELETE_USER,
  ADMIN_END_JUST_EDITED_USER,
  SET_EDIT_SUCCESS,
  SET_DELETE_SUCCESS

} from '../constants/userConstants';
import * as api from '../api/index.js';

export const login = (formData, navigate) => async (dispatch) => {

  const cart = JSON.parse(localStorage.getItem('cartItems'))


  try {
    const { data } = await api.login(formData);
  

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


export const updateUserDetail = (formData) => async (dispatch) => {
try {
    dispatch({type: START_LOADING})
    const { data } = await api.updateUserDetails(formData);
    dispatch({ type: UPDATE_USER_DETAILS, data });
    dispatch({ type: SET_SUCCESS });
    dispatch({ type: END_LOADING });
} catch (err) {
dispatch({ type: SET_ERROR, payload: err.response })
  }
};



export const getAllUsers = () => async (dispatch) => {

  try {

    dispatch({type: START_LOADING})
    const { data } = await api.getAllUsers();

    console.log(data)
   
    dispatch({ type: GET_ALL_USERS, data })
    dispatch({type: END_LOADING})
    
  } catch (err) {

    dispatch({ type: SET_ERROR, payload: err.response })
    
  }

}


export const adminUserEdit = (formData) => async (dispatch) => {
try {
   dispatch({type: START_LOADING})
    const { data } = await api.adminEditUser(formData);
    dispatch({ type: ADMIN_END_JUST_EDITED_USER, data })
   dispatch({ type: SET_EDIT_SUCCESS })
   dispatch({type: END_LOADING})
    
  } catch (err) {
   dispatch({ type: SET_ERROR, payload: err.response })
    }
}


export const adminUserDelete = (id) => async (dispatch) => {
  try {
     dispatch({type: START_LOADING})
      const { data } = await api.adminDeleteUser(id);
      dispatch({type: END_LOADING})
      
    } catch (err) {
     dispatch({ type: SET_ERROR, payload: err.response })
      }
  }






