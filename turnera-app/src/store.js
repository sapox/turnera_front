import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/features/contacto/userSlice';
import cajaReducer from './components/features/contacto/cajaSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    caja: cajaReducer,
  },
});
