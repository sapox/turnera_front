import { createSlice } from '@reduxjs/toolkit';
import { formatISO } from 'date-fns';

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
      const auxFecha = formatISO(new Date(`${fecha}`), {representation: 'date' });
      state.sucursalId = sucursalId;
      state.fecha = auxFecha;
      state.hora = hora;
      state.cajaId= cajaId;
    },
  },
});

export const { setTurnoValues } = turnoSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
//export const incrementAsync = amount => dispatch => {
//  setTimeout(() => {
//    dispatch(incrementByAmount(amount));
//  }, 1000);
//};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
//export const selectUser = state => state.user;

export default turnoSlice.reducer;
