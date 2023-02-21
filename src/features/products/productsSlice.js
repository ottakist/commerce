import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = { isSidebarOpen: false };
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    sidebarToggle: (state, action) => {
      state.isSidebarOpen = !action.payload;
    },
  },
  extraReducers: {},
});
export const { sidebarToggle } = productsSlice.actions;
export default productsSlice.reducer;
