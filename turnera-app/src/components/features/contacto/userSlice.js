import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dni: "",
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  cuentaContrato: "",
  titularCuenta: "",
  celular: "",
  submitted: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserValues: (state, action) => {
      const {
        dni,
        nombre,
        apellido,
        email,
        codArea,
        telefono,
        cuentaContrato,
        titularCuenta,
        celular,
      } = action.payload;
      state.dni = dni;
      state.nombre = nombre;
      state.apellido = apellido;
      state.email = email;
      state.telefono = codArea+telefono;
      state.cuentaContrato = cuentaContrato;
      state.titularCuenta = titularCuenta;
      state.celular= celular;
      state.submitted = !state.submitted;
    },
    resetUserValues: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUserValues, resetUserValues } = userSlice.actions;

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
export const selectUser = (state) => state.user;

export default userSlice.reducer;
