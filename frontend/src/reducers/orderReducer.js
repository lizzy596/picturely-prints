import { SET_ERROR, END_ERROR, START_LOADING, END_LOADING, GET_RECENT_ORDER } from '../constants/orderConstants'




const orderReducer = (state = { order: {}, error:false, isLoading: false }, action) => {
    switch (action.type) {


        case GET_RECENT_ORDER:

       
            return { ...state, order: action.payload.result }

        case START_LOADING:
           
            return { ...state, isLoading: true };
        case END_LOADING:
           return { ...state, isLoading: false };

        case SET_ERROR:
            return { ...state, error: true };
        case END_ERROR:
            return { ...state, error: false };

       
    
        default:
            return state;
    }
}

export default orderReducer