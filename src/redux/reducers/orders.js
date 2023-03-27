import Api from '../../config/Config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchfinished = createAsyncThunk(
  'orders/fetchfinished',
  async (_, thunkAPI) => {
    const token = JSON.parse(localStorage.getItem('office')).token;
    try {
      const response = await Api.get('/office/finshedorders', {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchUnfinished = createAsyncThunk(
  'orders/fetchUnfinished',
  async (_, thunkAPI) => {
    const token = JSON.parse(localStorage.getItem('office')).token;
    try {
      const response = await Api.get('/office/unfinshedorders', {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const confirmOrder = createAsyncThunk(
  'orders/confirmOrder',
  async (data) => {
    const token = JSON.parse(localStorage.getItem('office')).token;
    try {
      const response = await Api.post('/office/confirmOrder',data, {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);
export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (data) => {
    console.log(data);
    const token = JSON.parse(localStorage.getItem('office')).token;
    try {
      const response = await Api.post('/office/cancelOrder',data, {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);
 const orders = createSlice({
    name: 'orders',
    initialState: { value: {finished:[],unfinished:[]}},
    reducers: {

    },
    extraReducers: (builder) => {
      builder.addCase(fetchUnfinished.fulfilled, (state, action) => {
        state.value.unfinished = action.payload;
      });
      builder.addCase(fetchfinished.fulfilled, (state, action) => {
        state.value.finished = action.payload;
      });
    },
  });
export const {} = orders.actions

export default orders.reducer