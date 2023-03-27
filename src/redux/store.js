import { configureStore } from '@reduxjs/toolkit'
import orders from './reducers/orders';
import register from './reducers/register';
import worker from './reducers/worker';
import office from './reducers/office';
export const store = configureStore({
  reducer: {
    register,
    orders,
    worker,
    office,
       
  },
})