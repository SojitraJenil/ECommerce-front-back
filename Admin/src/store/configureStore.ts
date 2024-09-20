// store/configureStore.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'; // Adjust the path based on your structure

const store: any = configureStore({
  reducer: rootReducer,
});

export default store;
