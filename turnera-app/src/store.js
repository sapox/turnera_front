import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/features/contacto/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
