import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/products";
import themesReducer from "./reducers/themes";

const store = configureStore({
  reducer: {
    themes: themesReducer,
    products: productsReducer,
  },
});

//store.subscribe(function () {});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
