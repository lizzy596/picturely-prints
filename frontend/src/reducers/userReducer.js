import { AUTH, SET_ERROR, END_ERROR } from '../constants/userConstants';






const userReducer = (state = { authData: null, loading: false, userInfo: null,  success_message: '', error: false, error_message: '', userLogin: null }, action) => {
    switch (action.type) {


        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data };

        case SET_ERROR:
            
            return { ...state, error: true, error_message: action.payload.data.msg, };
        
        case END_ERROR:
            
             return { ...state, error: false, error_message: '', };
       
    
        default:
            return state;
    }
}

export default userReducer