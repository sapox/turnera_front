import { configureStore } from '@reduxjs/toolkit';
import userReducer from './components/features/contacto/userSlice';
import cajaReducer from './components/features/contacto/cajaSlice';
import turnoReducer from './components/features/contacto/turnoSlice';
import turnoConfirmadoReducer from './components/features/contacto/turnoConfirmadoSlice';
import disclaimerReducer from './components/features/contacto/disclaimerSlice';
import * as api from "./api";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import authReducer from "./redux/authReducer";

export default configureStore({

  reducer: {
    user: userReducer,
    caja: cajaReducer,
    turno: turnoReducer,
    turnoConfirmado: turnoConfirmadoReducer,
    disclaimer: disclaimerReducer,
  },
});
