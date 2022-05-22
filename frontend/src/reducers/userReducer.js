import { AUTH, SET_ERROR, END_ERROR, 
    UPDATE_USER_DETAILS, SET_SUCCESS, 
    END_SUCCESS, GET_ALL_USERS,
    ADMIN_EDIT_USER,
    ADMIN_DELETE_USER, 
    START_LOADING, 
    END_LOADING,
    ADMIN_END_JUST_EDITED_USER,
    SET_EDIT_SUCCESS, 
    SET_DELETE_SUCCESS, 
    LOG_OUT
} from '../constants/userConstants';





const userReducer = (state = { authData: null, isLoading: false, success: false, userInfo: null,  success_message: '', error: false, error_message: '', users: [], editingUser: false, userToEdit: {}, page:null, pages:null}, action) => {
    switch (action.type) {


        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data };

        case LOG_OUT:
            localStorage.clear();
            return { ...state, authData: null };

        case SET_ERROR:
            
            return { ...state, error: true, error_message: action.payload.data.msg, };
        
        case END_ERROR:
            
             return { ...state, error: false, error_message: '', };

        case START_LOADING:
            
                return { ...state, isLoading: true };
            
        case END_LOADING:
                
                 return { ...state, isLoading: false };

        case SET_SUCCESS:
            
                return { ...state, success: true, success_message: 'profile updated!', };
            
        case END_SUCCESS:
                
                 return { ...state, success: false, success_message: '', };
        case SET_EDIT_SUCCESS:

             console.log('edit')
            
                return { ...state, success: true, success_message: 'user details updated!' };
                
        case SET_DELETE_SUCCESS:

          
            
                    return { ...state, success: true, success_message: 'user deleted!' };
                        

        case UPDATE_USER_DETAILS:

            localStorage.clear()
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));


            return { ...state, authData: action.data };

        case GET_ALL_USERS:
            return { ...state, users: action.payload.result, page: action.payload?.page, pages: action.payload?.result[0]?.full_count / action.payload.pageSize  };
        case ADMIN_EDIT_USER:
           
            return { ...state, editingUser:true, userToEdit: state.users.find((user) => user.user_id === action.payload)};
        case ADMIN_END_JUST_EDITED_USER:
           
            return { ...state, editingUser:false, userToEdit: {}};
       
    
        default:
            return state;
    }
}

export default userReducer