import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    dni: '',
		nombre: '',
		apellido: '',
		email: '',
		telefono: '',
		cuenta: '',
  },
  reducers: {
    setUserValues: (state, action) => {
      console.log(action.payload);
      state.dni = action.payload.dni;
      state.nombre = action.payload.nombre;
      state.apellido = action.payload.apellido;
      state.email = action.payload.email;
      state.telefono = action.payload.telefono;
      state.cuenta = action.payload.cuenta;
    },
  },
});

export const { setUserValues } = userSlice.actions;

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
export const selectUser = state => state.user;

export default userSlice.reducer;
