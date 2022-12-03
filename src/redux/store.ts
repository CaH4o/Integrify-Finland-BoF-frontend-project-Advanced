import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/products";
import themesReducer from "./reducers/themes";
import credenitalsReducer from "./reducers/credenital";
import usersReducer from "./reducers/users";
import cartReducer from "./reducers/cart";

const store = configureStore({
  reducer: {
    themes: themesReducer,
    products: productsReducer,
    credential: credenitalsReducer,
    users: usersReducer,
    cart: cartReducer,
  },
});

//store.subscribe(function () {});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
