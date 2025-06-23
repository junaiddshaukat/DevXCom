import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })

    //get all product of shop
    // .addCase("getAllProductShopRequest", (state) => {
    //   state.isLoading = true;
    // })
    // .addCase("getAllProductShopSuccess", (state, action) => {
    //   state.isLoading = false;
    //   state.products = action.payload;

    // })
    // .addCase("getAllProductShopFailed", (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;

    // })
    // // delete product of a shop
    // .addCase("deleteProductRequest", (state) => {
    //   state.isLoading = true;
    // })
    // .addCase("deleteProductSuccess", (state, action) => {
    //   state.isLoading = false;
    //   state.message = action.payload;

    // })
    // .addCase("deleteProductFailed", (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;

    // })

    
    // // get all products
    // .addCase("getAllProductsRequest", (state) => {
    //   state.isLoading = true;
    // })
    // .addCase("getAllProductsSuccess", (state, action) => {
    //   state.isLoading = false;
    //   state.allProducts = action.payload;
    // })
    // .addCase("getAllProductsFailed", (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // })
});