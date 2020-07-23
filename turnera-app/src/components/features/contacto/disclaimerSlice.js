import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConfirmed: false,
  submitted: false,
};

export const disclaimerSlice = createSlice({
  name: "disclaimer",
  initialState: initialState,
  reducers: {
    setDisclaimerValue: (state, action) => {
      state.isConfirmed = action.payload;
      state.submitted = !state.submitted;
    },
    resetDisclaimer: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setDisclaimerValue, resetDisclaimer } = disclaimerSlice.actions;

export default disclaimerSlice.reducer;
