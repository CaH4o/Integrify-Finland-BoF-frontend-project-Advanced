import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../../redux/reducers/products";
import cartReducer from "../../redux/reducers/cart";
import credenitalsReducer from "../../redux/reducers/credenital";
import usersReducer from "../../redux/reducers/users";
import themesReducer from "../../redux/reducers/themes";

export default function createStore() {
  const store = configureStore({
    reducer: {
      productsReducer,
      cartReducer,
      credenitalsReducer,
      usersReducer,
      themesReducer,
    },
  });

  return store;
}
