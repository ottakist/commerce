import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { products_url } from '../../utils/constants';
const initialState = {
  isSidebarOpen: false,
  featuredProducts: [],
  products: [],
  isLoading: true,
  products_error: false,
  single_product: [],
  single_isLoading: true,
  single_product_error: false,
};
export const getProducts = createAsyncThunk(
  'products/getProduct',
  async (rejectWithValue) => {
    try {
      const response = await fetch(`${products_url}`);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);
export const getSingleProduct = createAsyncThunk(
  'products/getSingleProduct',
  async (url, rejectWithValue) => {
    try {
      const response = await fetch(`${url}`);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);
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
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredProducts = action.payload.filter(
          (product) => product.featured === true
        );
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.products_error = true;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.single_isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.single_isLoading = false;
        state.single_product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state) => {
        state.single_isLoading = false;
        state.single_product_error = true;
      });
  },
});
export const { sidebarToggle } = productsSlice.actions;
export default productsSlice.reducer;
