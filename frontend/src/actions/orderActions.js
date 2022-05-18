import * as api from '../api/index.js';
import {CREATE_ORDER, START_LOADING, END_LOADING, GET_ORDER_BY_ID, GET_USER_ORDERS, GET_ALL_ORDERS } from '../constants/orderConstants';







export const addOrder = (orderInfo) => async (dispatch) => {


    const { data } = await api.placeOrder(orderInfo)



}


export const getOrderById = (id) => async (dispatch) => {
    //dispatch({ type: START_LOADING });
    const { data } = await api.getOrder(id)
     dispatch({ type: GET_ORDER_BY_ID, payload: data });
}



export const getUserOrdersById = (id) => async (dispatch) => {
    dispatch({ type: START_LOADING });
    const { data } = await api.getUserOrders(id)
    dispatch({ type: GET_USER_ORDERS, payload: data });
    dispatch({ type: END_LOADING });
}



export const allOrders = () => async (dispatch) => {
    dispatch({ type: START_LOADING });
    const { data } = await api.getAllOrders()

    
    dispatch({ type: GET_ALL_ORDERS, payload: data });
    dispatch({ type: END_LOADING });
}


