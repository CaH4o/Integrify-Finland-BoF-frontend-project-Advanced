import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/Products";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

store.subscribe(function () {});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
