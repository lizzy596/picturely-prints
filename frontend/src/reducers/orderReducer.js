import { SET_ERROR, END_ERROR, START_LOADING, END_LOADING, GET_ORDER_BY_ID, GET_USER_ORDERS, GET_ALL_ORDERS, PAY_ORDER, ORDER_PAID, ORDER_PAY_RESET, ORDER_DELIVERED} from '../constants/orderConstants'




const orderReducer = (state = { order: {}, orders:[], loadingOrders: false, errorOrders: false, error: false, success: false, error_message: '', success_message: '', page: null, pages: null, payDetails: {}, orderPaid: false, orderDelivered: false}, action) => {
    switch (action.type) {


        case GET_ORDER_BY_ID:

       
            return { ...state, order: action.payload.result};

        case GET_USER_ORDERS:
            return { ...state, orders: action.payload.result };

        case GET_ALL_ORDERS:
            return { ...state, orders: action.payload.result, page: action.payload?.page, pages: action.payload?.result[0]?.full_count / action.payload.pageSize };
        case PAY_ORDER:
            return { ...state, payDetails: { }};
        case ORDER_PAID: 
        return { ...state, orderPaid: true};
        case ORDER_DELIVERED: 
        return { ...state, orderDelivered: true};
        case ORDER_PAY_RESET: 
        return { ...state, orderPaid: false, orderDelivered: false};

        case START_LOADING:
           
            return { ...state, loadingOrders: true };
        case END_LOADING:
           return { ...state, loadingOrders: false };

        case SET_ERROR:
            return { ...state, errorOrders: true, error_message: action.payload.data.msg  };
        case END_ERROR:
            return { ...state, errorOrders: false, error_message: '' };

       
    
        default:
            return state;
    }
}

export default orderReducer