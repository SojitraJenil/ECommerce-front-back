import { combineReducers } from 'redux';
import userReducer from './userSlice';
import inquiryReducer from './inquiriesSlice';
import productReducer from './productSlice';
import orderReducer from './orderSlice';

const rootReducer: any = combineReducers({
  users: userReducer,
  product: productReducer,
  inquiry: inquiryReducer,
  order: orderReducer,
});

export type RootState = {
  counter: {
    value: number;
  };
  users: any;
  product: any;
  inquiry: any;
  order: any;
};

export default rootReducer;
