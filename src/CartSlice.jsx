import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initial state with an empty array
  },
  reducers: {
    // Adds a new plant item or increments quantity if already exists
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    
    // Removes an item entirely from the cart based on the name
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    
    // Updates the quantity of a specific item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Export action creators to use in components
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export reducer as default to use in store.js
export default cartSlice.reducer;