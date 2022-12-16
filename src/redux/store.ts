import { configureStore } from "@reduxjs/toolkit";

import { IProduct } from "../types/IProduct";
import productsReducer from "./reducers/products";
import themesReducer from "./reducers/themes";
import credenitalsReducer from "./reducers/credenital";
import usersReducer from "./reducers/users";
import cartReducer from "./reducers/cart";
import {
  getLocalProductFevorit,
  setLocalProductFevorit,
  initProduct,
  setLocalProductFevoritSingle,
  getLocalProductCart,
  setLocalProductCart,
} from "../api/productsWorker";
import { ICartState } from "../types/ICartState";

const backUp: IProduct[] = getLocalProductFevorit();
const cart: ICartState = getLocalProductCart();

const store = configureStore({
  reducer: {
    themes: themesReducer,
    products: productsReducer,
    credential: credenitalsReducer,
    users: usersReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart,
    products: {
      backUp,
      present: [],
      single: initProduct(),
      categories: [],
      loading: false,
      error: false,
      page: 1,
      sortDir: { byCategories: "asc", byPrice: "asc" },
      filters: {
        search: "",
        categories: [],
        favorite: "off",
      },
    },
  },
});

store.subscribe(function () {
  setLocalProductFevorit(store.getState().products.backUp);
  setLocalProductFevoritSingle(store.getState().products.single);
  setLocalProductCart(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
