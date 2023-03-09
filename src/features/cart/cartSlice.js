import { createSlice } from '@reduxjs/toolkit';

const getLocalStorage = () => {
  const storage = localStorage.getItem('cart');
  if (storage) {
    return JSON.parse(localStorage.getItem('cart'));
  } else {
    return [];
  }
};
const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  fee: 399,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { id, color, amount, product } = payload;
      const tempItem = state.cart.find((i) => i.id === id + color);
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color: color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        state.cart = [...state.cart, newItem];
      }
    },
    toggleAmount: (state, { payload }) => {
      const { id, type } = payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (type === 'inc') {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          }
          if (type === 'dec') {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        }
        return item;
      });
      return { ...state, cart: tempCart };
    },
    removeProduct: (state, { payload }) => {
      state.cart = state.cart.filter((product) => product.id !== payload);
    },
    clearCart: () => {
      return { cart: [], total_items: 0, total_amount: 0, fee: 399 };
    },
    calculateTotals: (state) => {
      const {total_items,total_amount} = state.cart.reduce((total,item)=>{
        const {amount,price}=item
        total.total_items += amount
        total.total_amount+= amount*price
        return total
      },{total_amount:0,total_items:0})
      state.total_amount = total_amount
      state.total_items = total_items
    },
  },
});
export const { addToCart, removeProduct, clearCart, toggleAmount,calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
