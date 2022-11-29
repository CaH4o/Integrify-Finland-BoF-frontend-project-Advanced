import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/products";
import themesReducer from "./reducers/themes";
import credenitalsReducer from "./reducers/credenital";
import usersReducer from "./reducers/users";

const store = configureStore({
  reducer: {
    themes: themesReducer,
    products: productsReducer,
    credential: credenitalsReducer,
    users: usersReducer,
  },
});

//store.subscribe(function () {});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
