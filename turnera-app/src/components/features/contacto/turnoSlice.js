import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sucursalId: '',
  fecha: '',
  hora: '',
  cajaId: '',
  submitted: false,
}

export const turnoSlice = createSlice({
  name: 'turno',
  initialState: initialState,
  reducers: {
    setTurnoValues: (state, action) => {
      const { fecha, hora, sucursalId, cajaId } = action.payload;
      state.sucursalId = sucursalId;
      state.fecha = fecha;
      state.hora = hora;
      state.cajaId = cajaId;
      state.submitted = !state.submitted;
    },
    resetTurnoValues: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setTurnoValues, resetTurnoValues } = turnoSlice.actions;

export default turnoSlice.reducer;
