import { combineReducers } from 'redux';
import userReducer from './userSlice';
import inquiryReducer from './inquiriesSlice';
import productReducer from './productSlice';
import orderReducer from './orderSlice';
import cartReducer from './cartSlice';

const rootReducer: any = combineReducers({
  users: userReducer,
  product: productReducer,
  inquiry: inquiryReducer,
  order: orderReducer,
  cart: cartReducer,
});

export type RootState = {
  counter: {
    value: number;
  };
  users: any;
  product: any;
  inquiry: any;
  order: any;
  cart: any;
};

export default rootReducer;
