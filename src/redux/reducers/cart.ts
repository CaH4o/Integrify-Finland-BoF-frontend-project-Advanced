import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/IProduct";

const initialState: IProduct[] = [];

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartProductRemove() {},
    cartProductAdd() {},
  },
});

const cartReducer = cart.reducer;
export const {} = cart.actions;
export default cartReducer;
