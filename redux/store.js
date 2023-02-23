import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createWrapper } from "next-redux-wrapper";
import dashboardSlice from './dashboardSlice';
import gcSlice from './gcSlice';
import clientSlice from './clientSlice';

const reducers = combineReducers({
  dashboardSlice: dashboardSlice,
  gcSlice: gcSlice,
  clientSlice: clientSlice,
 
});


export const makeStore = (context) => {
  const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
  });
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });