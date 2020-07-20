import { createSlice } from '@reduxjs/toolkit';

export const turnoSlice = createSlice({
  name: 'turno',
  initialState: {
    sucursalId: '',
    fecha: '',
    hora: '',
    cajaId: '',
  },
  reducers: {
    setTurnoValues: (state, action) => {
      const { fecha, hora, sucursalId, cajaId } = action.payload;
      state.sucursalId = sucursalId;
      state.fecha = fecha;
      state.hora = hora;
      state.cajaId = cajaId;
    },
  },
});

export const { setTurnoValues } = turnoSlice.actions;

export default turnoSlice.reducer;
