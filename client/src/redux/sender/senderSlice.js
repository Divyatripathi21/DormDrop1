import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSender: null,
};

const senderSlice = createSlice({
  name: 'SENDER',
  initialState,
  reducers: {
    theSender: (state, action) => {
      state.currentSender = action.payload;
    },
  },
});

export const { theSender} = senderSlice.actions;

export default senderSlice.reducer;










