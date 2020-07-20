import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/features/contacto/userSlice';
import cajaReducer from './components/features/contacto/cajaSlice';
import turnoReducer from './components/features/contacto/turnoSlice';
import turnoConfirmadoReducer from './components/features/contacto/turnoConfirmadoSlice';
import disclaimerReducer from './components/features/contacto/disclaimerSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    caja: cajaReducer,
    turno: turnoReducer,
    turnoConfirmado: turnoConfirmadoReducer,
    disclaimer: disclaimerReducer,
  },
});
