import { SET_ERROR, END_ERROR, START_LOADING, END_LOADING, GET_ORDER_BY_ID, GET_USER_ORDERS, GET_ALL_ORDERS } from '../constants/orderConstants'




const orderReducer = (state = { order: {}, orders:[], loadingOrders: false, errorOrders: false, error: false, success: false, error_message: '', success_message: '' }, action) => {
    switch (action.type) {


        case GET_ORDER_BY_ID:

       
            return { ...state, order: action.payload.result};

        case GET_USER_ORDERS:
            return { ...state, orders: action.payload.result };

        case GET_ALL_ORDERS:
            return { ...state, orders: action.payload.result };

        case START_LOADING:
           
            return { ...state, loadingOrders: true };
        case END_LOADING:
           return { ...state, loadingOrders: false };

        case SET_ERROR:
            return { ...state, errorOrders: true };
        case END_ERROR:
            return { ...state, errorOrders: false };

       
    
        default:
            return state;
    }
}

export default orderReducer