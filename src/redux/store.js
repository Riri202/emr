import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import adminLoginPermissionReducer from './features/others/admin/adminPermissionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminLoginPermission: adminLoginPermissionReducer,
    middleware: [...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })]
  }
});
