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
      navigate('/page/1')

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



export const getAllUsers = (pageNumber) => async (dispatch) => {

  try {

    dispatch({type: START_LOADING})
    const { data } = await api.getAllUsers(pageNumber);
    console.log('hey')
  
   
    dispatch({ type: GET_ALL_USERS, payload: data })
    dispatch({type: END_LOADING})
    
  } catch (err) {

    

    dispatch({ type: SET_ERROR, payload: err.response })
    dispatch({type: END_LOADING})
    
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


  export const sampleTrialLogin = (navigate) => async (dispatch) => {

    
    try {

      console.log('goose')
      
      const { data } = await api.sampleLogin();
      console.log(data)
    dispatch({ type: AUTH, data });
    navigate('/page/1') 
    } catch (err) {
     
      dispatch({ type: SET_ERROR, payload: err.response }) 
    }
  };



  export const sampleTrialLoginAdmin = (navigate) => async (dispatch) => {

    
    try {

  const { data } = await api.sampleLoginAdmin();
    dispatch({ type: AUTH, data });
    navigate('/') 
    } catch (err) {
      console.log(err)
     dispatch({ type: SET_ERROR, payload: err.response }) 
    }
  };







