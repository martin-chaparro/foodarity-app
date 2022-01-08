import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import productReducer from './productReducer';

export default combineReducers({
  product: productReducer,
  user: userReducer,
  auth: authReducer,
});
