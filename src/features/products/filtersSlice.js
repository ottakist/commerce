import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  all_products: [],
  filtered_products: [],
  grid_view: true,
  list_view: false,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setView: (state, { payload }) => {
      if (payload === 'grid') {
        state.grid_view = true;
        state.list_view = false;
      } else {
        state.list_view = true;
        state.grid_view = false;
      }
    },
    loadProducts: (state, { payload }) => {
      let maxPrice = Math.max(...payload.map((p) => Math.max(p.price)));
      return {
        ...state,
        all_products: [...payload],
        filtered_products: [...payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    },
    updateSort: (state, { payload }) => {
      if (payload === 'price-lowest') {
        state.filtered_products = state.filtered_products.sort(
          (a, b) => a.price - b.price
        );
      }
      if (payload === 'price-highest') {
        state.filtered_products = state.filtered_products.sort(
          (a, b) => b.price - a.price
        );
      }
      if (payload === 'name-a') {
        state.filtered_products = state.filtered_products.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (payload === 'name-z') {
        state.filtered_products = state.filtered_products.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      state.sort = payload;
    },
    updateFilters:(state,{payload})=>{
      state.filters[payload[0]] = payload[1]
    },
    filterProducts:()=>{
      console.log("filterd");
    },
    clearFilters:(state,{payload})=>{

    },
  },
});
export const { loadProducts, setView, updateSort,updateFilters,clearFilters,filterProducts } = filterSlice.actions;
export default filterSlice.reducer;
