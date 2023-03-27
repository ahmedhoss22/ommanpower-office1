import Api from './../../config/Config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchVisitors = createAsyncThunk(
    'register/fetchVisitors',
    async (_, thunkAPI) => {
      const token = JSON.parse(localStorage.getItem('office')).token;
      try {
        const response = await Api.get('/visitorData/registration', {
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
export const fetchStaff = createAsyncThunk(
    'register/fetchStaff',
    async (_, thunkAPI) => {
      const token = JSON.parse(localStorage.getItem('office')).token;
      try {
        const response = await Api.get('/staff/data', {
          headers: {
            'authorization': `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  export const fetchCountryData = createAsyncThunk(
    'register/fetchCountryData',
    async (_, thunkAPI) => {
      const token = JSON.parse(localStorage.getItem('office')).token;
      try {
        const response = await Api.get('/country', {
          headers: {
            'authorization': `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
export const deleteStaff = createAsyncThunk(
  'register/deleteStaff',
  async (id) => {
    console.log(id);
    const token = JSON.parse(localStorage.getItem('office')).token;
    try {
      const response = await Api.post('/staff/delete',{id}, {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response.data)
    }
  }
);
export const fetchOffices = createAsyncThunk(
  'register/fetchOffices',
  async (_, thunkAPI) => {
    const token = JSON.parse(localStorage.getItem('office')).token;
    try {
      const response = await Api.get('/offices/data', {
        headers: {
          'authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
 const register = createSlice({
    name: 'register',
    initialState: { value: { visitors:[],offices:[],country:[],staff:{data:[],err:"",}} },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchVisitors.fulfilled, (state, action) => {
        state.value.visitors = action.payload;
      });
      builder.addCase(fetchStaff.fulfilled, (state, action) => {
        state.value.staff.data = action.payload;
      });
      builder.addCase(fetchCountryData.fulfilled,(state,action)=>{
        state.value.country=action.payload
      })
      builder.addCase(fetchOffices.fulfilled,(state,action)=>{
        state.value.offices=action.payload
      })
    },
  });
export const {} = register.actions
export default register.reducer