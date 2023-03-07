import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from '../features/products/filtersSlice';
import productsSlice from '../features/products/productsSlice';
import cartSlice from '../features/cart/cartSlice';
export default configureStore({
  reducer: {
    products: productsSlice,
    filters:filtersSlice,
    cart:cartSlice
  },
});
