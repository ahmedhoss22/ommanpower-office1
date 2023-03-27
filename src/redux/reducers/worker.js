import Api from '../../config/Config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const deleteWorker = createAsyncThunk(
  'worker/deleteWorker',
  async (data) => {
    const token = JSON.parse(localStorage.getItem('office')).token;
    try {
      const response = await Api.post('/worker/delete',data, {
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
export const fetchWorkers = createAsyncThunk(
    'worker/fetchWorkers',
    async (data) => {
      console.log(data);
      const token = JSON.parse(localStorage.getItem('office')).token;
      try {
        const response = await Api.get('/workerData/registration', {
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
 const worker = createSlice({
    name: 'worker',
    initialState: { value: {worker:[]}},
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchWorkers.fulfilled, (state, action) => {
        state.value.worker = action.payload;
        console.log(action.payload);
      });
    },
  });
export const {} = worker.actions

export default worker.reducer