import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  cart: [],
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
    clearCart: () => {
      return { cart: [], total_items: 0, total_amount: 0, fee: 399 };
    },
  },
});
export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
