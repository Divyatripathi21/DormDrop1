import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentYourOrders: null,
};

const YourOrdersSlice = createSlice({
  name: 'YOURORDERS',
  initialState,
  reducers: {
    theYourOrders: (state, action) => {
      state.currentYourOrders = action.payload; 
    },
  },
});

export const { theYourOrders } = YourOrdersSlice.actions;

export default YourOrdersSlice.reducer;