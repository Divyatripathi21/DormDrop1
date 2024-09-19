import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentRecSideSender: null,
};

const recSideSenderrSlice = createSlice({
  name: 'RECSIDESENDER',
  initialState,
  reducers: {
    theRecSideSender: (state, action) => {
      state.currentRecSideSender = action.payload;
    },
  },
});

export const { theRecSideSender} = recSideSenderrSlice.actions;

export default recSideSenderrSlice.reducer;










