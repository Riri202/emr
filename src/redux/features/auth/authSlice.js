import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

// get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};
const API_URL = 'https://emr-server.herokuapp.com';

// login staff
export const login = createAsyncThunk(`${API_URL}/auth/login`, async (userData, thunkAPI) => {
  try {
    const data = await authService.login(userData);
    console.log(data);
    return { user: data };
  } catch (error) {
    console.log('an error occured');
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        state.user = null;
      });
  }
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
