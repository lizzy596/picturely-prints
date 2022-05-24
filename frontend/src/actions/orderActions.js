import * as api from '../api/index.js';
import {CREATE_ORDER, START_LOADING, END_LOADING, GET_ORDER_BY_ID, GET_USER_ORDERS, 
    GET_ALL_ORDERS, SET_ERROR, END_ERROR,
     PAY_ORDER, ORDER_PAID, ORDER_DELIVERED } from '../constants/orderConstants';







export const addOrder = (orderInfo) => async (dispatch) => {


    const { data } = await api.placeOrder(orderInfo)



}


export const getOrderById = (id) => async (dispatch) => {
    dispatch({ type: START_LOADING });
    const { data } = await api.getOrder(id)
     dispatch({ type: GET_ORDER_BY_ID, payload: data });
     dispatch({ type: END_LOADING });
}



export const getUserOrdersById = (id) => async (dispatch) => {
    dispatch({ type: START_LOADING });
    const { data } = await api.getUserOrders(id)
    dispatch({ type: GET_USER_ORDERS, payload: data });
    dispatch({ type: END_LOADING });
}



export const allOrders = (pageNumber) => async (dispatch) => {

    try {

    dispatch({ type: START_LOADING });
    const { data } = await api.getAllOrders(pageNumber)

    
    dispatch({ type: GET_ALL_ORDERS, payload: data });
    dispatch({ type: END_LOADING });
        
    } catch (err) {
        dispatch({ type: SET_ERROR, payload: err.response })
        dispatch({ type: END_LOADING });
    }
    
}



export const payUserOrder = (orderId, id) => async (dispatch) => {

    try {

    dispatch({ type: START_LOADING });
    const { data } = await api.payOrder(orderId, id)


    

    
    //dispatch({ type: PAY_ORDER, payload: data });
    dispatch({ type: ORDER_PAID });
    dispatch({ type: END_LOADING });
        
    } catch (err) {
        dispatch({ type: SET_ERROR, payload: err.response })
        dispatch({ type: END_LOADING });
    }
    
}


export const deliverUserOrder = (orderId) => async (dispatch) => {

    try {

    dispatch({ type: START_LOADING });
    const { data } = await api.deliverOrder(orderId)

    dispatch({ type: ORDER_DELIVERED });
    dispatch({ type: END_LOADING });
        
    } catch (err) {
        dispatch({ type: SET_ERROR, payload: err.response })
        dispatch({ type: END_LOADING });
    }
    
}





