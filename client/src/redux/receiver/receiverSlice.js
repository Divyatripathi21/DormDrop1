import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentReceiver: null,
};

const receiverSlice = createSlice({
  name: 'RECEIVER',
  initialState,
  reducers: {
    theReceiver: (state, action) => {
      state.currentReceiver = action.payload;
    },
  },
});

export const { theReceiver} = receiverSlice.actions;

export default receiverSlice.reducer;










