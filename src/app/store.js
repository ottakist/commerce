import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from '../features/products/filtersSlice';
import productsSlice from '../features/products/productsSlice';
export default configureStore({
  reducer: {
    products: productsSlice,
    filters:filtersSlice
  },
});
