import Api from '../../config/Config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchOffice = createAsyncThunk(
    'office/fetchOffice',
    async (data) => {
      console.log(data);
      const token = JSON.parse(localStorage.getItem('office')).token;
      try {
        const response = await Api.get('/office/data', {
          headers: {
            'authorization': `Bearer ${token}`,
          },
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        if(error.response.status==401) return window.location.assign('/signin')
        return Promise.reject(error.message);
      }
    }
  );
 const office = createSlice({
    name: 'office',
    initialState: { value: {data:[]}},
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchOffice.fulfilled, (state, action) => {
        state.value.data = action.payload;
      });
    },
  });
export const {} = office.actions

export default office.reducer