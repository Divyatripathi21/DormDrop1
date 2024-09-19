import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentOtp: null,
};

const otpSlice = createSlice({
  name: 'OTP',
  initialState,
  reducers: {
    theOtp: (state, action) => {
      state.currentOtp = action.payload;
    },
  },
});

export const { theOtp } = otpSlice.actions;

export default otpSlice.reducer;