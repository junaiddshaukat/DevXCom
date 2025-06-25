import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';
import { sellerReducer } from './reducers/seller';
import { productReducer } from './reducers/product';
import { eventReducer } from './reducers/event';

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    event: eventReducer, // Changed from "events" to "event"
  },
});

export default Store;