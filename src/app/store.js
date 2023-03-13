import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import noteReducer from '../features/note/noteSlice';
import labelReducer from '../features/label/labelSlice';
import actionReducer from '../features/action/actionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
    label: labelReducer,
    action: actionReducer,
  },
});
