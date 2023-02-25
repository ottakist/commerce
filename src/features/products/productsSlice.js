import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { products_url } from '../../utils/constants';
import axios from 'axios';
const initialState = {
  isSidebarOpen: false,
  products: [],
  featuredProducts: [],
  isLoading: true,
  products_error: false,
};
export const getProducts = createAsyncThunk('cart/getCartItems', () => {
  return fetch(products_url)
    .then((resp) => resp.json())
    .catch((err) => {
      console.log(err);
    });
});
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    sidebarToggle: (state, action) => {
      state.isSidebarOpen = !action.payload;
    },
  },

 extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state,action) => {
        state.isLoading = false;
      
        state.featuredProducts = action.payload.filter(
            (product) => product.featured === true
          );
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        console.log("finaly");
        state.isLoading = false;
        state.products_error = true;
    
      });
  },
})
export const { sidebarToggle } = productsSlice.actions;
export default productsSlice.reducer;
