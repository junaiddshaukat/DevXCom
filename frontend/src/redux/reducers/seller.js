import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  seller: null,
  loading: false,
  error: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    // Make sure these action types match exactly what you're dispatching
    .addCase("LoadSellerRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      console.log("LoadSellerSuccess triggered with payload:", action.payload); // Debug log
      state.isSeller = true;
      state.seller = action.payload;
      state.loading = false;
      state.error = null;
    })
    .addCase("LoadSellerFail", (state, action) => {
      console.log("LoadSellerFail triggered:", action.payload); // Debug log
      state.loading = false;
      state.error = action.payload;
      state.isSeller = false;
      state.seller = null;
    })
    .addCase("LoginSellerSuccess", (state, action) => {
      console.log("LoginSellerSuccess triggered with payload:", action.payload); // Debug log
      state.isSeller = true;
      state.seller = action.payload;
      state.loading = false;
      state.error = null;
    })
    .addCase("LoginSellerFail", (state, action) => {
      console.log("LoginSellerFail triggered:", action.payload); // Debug log
      state.loading = false;
      state.error = action.payload;
      state.isSeller = false;
      state.seller = null;
    });
});