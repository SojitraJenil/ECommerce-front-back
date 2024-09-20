// store/combineReducer.ts
import { combineReducers } from 'redux';
import rootReducer from '../reducers/index'; // Adjust the path based on your structure

const combinedReducer: any = combineReducers({
  root: rootReducer,
});

export default combinedReducer;
