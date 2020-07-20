import { createSlice } from '@reduxjs/toolkit';

export const disclaimerSlice = createSlice({
  name: 'disclaimer',
  initialState: {
    isConfirmed: false,
    submitted: false,
  },
  reducers: {
    setDisclaimerValue: (state, action) => {
      state.isConfirmed = action.payload;
      state.submitted = !state.submitted;
    },
  },
});

export const { setDisclaimerValue } = disclaimerSlice.actions;

export default disclaimerSlice.reducer;