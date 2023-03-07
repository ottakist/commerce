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
    updateFilters: (state, { payload }) => {
      state.filters[payload.name] = payload.value;
    },
    filterProducts: (state) => {
      const { all_products } = state;
      let tempProducts = [...all_products];
      const { text, category, company, color, price, shipping, max_price } =
        state.filters;

      if (text) {
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        );
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }
      if (company !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }
      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }
      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping === true
        );
      }
      if (max_price !== 0) {
        tempProducts = tempProducts.filter((product) => product.price <= price);
      }
      state.filtered_products = tempProducts;
    },
    clearFilters: (state) => {
      // let maxPrice = Math.max(
      //   ...state.all_products.map((p) => Math.max(p.price))
      // );
      return {
        ...state,
        filtered_products: state.all_products,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          min_price: 0,
          price: state.filters.max_price,
          shipping: false,
        },
      };
    },
  },
});
export const {
  loadProducts,
  setView,
  updateSort,
  updateFilters,
  clearFilters,
  filterProducts,
} = filterSlice.actions;
export default filterSlice.reducer;
