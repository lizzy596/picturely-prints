import { combineReducers } from 'redux';

import cartReducer from './cartReducer'
import orderReducer from './orderReducer'
import productReducer from './productReducer'
import userReducer from './userReducer'

export const reducers = combineReducers({ cartReducer, orderReducer, productReducer, userReducer });