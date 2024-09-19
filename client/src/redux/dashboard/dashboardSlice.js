import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDashboard: null,
};

const dashboardSlice = createSlice({
  name: 'DASHBOARD',
  initialState,
  reducers: {
    theDashboard: (state, action) => {
      state.currentDashboard = action.payload;
      
    },
  },
});

export const { theDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;