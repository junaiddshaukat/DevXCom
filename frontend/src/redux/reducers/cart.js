// cartReducer.js
import { createAction, createReducer } from "@reduxjs/toolkit";

// Correct action creators
export const addToCart = createAction("addToCart");
export const removeFromCart = createAction("removeFromCart");

// Initial state
const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

// Reducer
export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);

      if (isItemExist) {
        state.cart = state.cart.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.cart.push(item);
      }
    })
    .addCase(removeFromCart, (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    });
});