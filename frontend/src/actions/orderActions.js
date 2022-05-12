import * as api from '../api/index.js';
import {CREATE_ORDER, START_LOADING, END_LOADING, GET_RECENT_ORDER } from '../constants/orderConstants';







export const addOrder = (orderInfo) => async (dispatch) => {


    const { data } = await api.placeOrder(orderInfo)



}


export const getMostRecentOrder = (id) => async (dispatch) => {

    dispatch({ type: START_LOADING });
    const { data } = await api.getRecentOrder(id)

   dispatch({ type: GET_RECENT_ORDER, payload: data });
   dispatch({ type: END_LOADING });
}