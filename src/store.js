import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    // The 'cart' key maps to the cart slice managed by cartReducer
    cart: cartReducer,
  },
});

export default store;