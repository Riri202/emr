import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    middleware: [...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })]
  }
});
