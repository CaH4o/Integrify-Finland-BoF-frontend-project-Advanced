import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICart, ICartState, IProductCart } from "../../types/ICartState";

const initialState: ICartState = { carts: [], noProducts: 0 };

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartProductRemove(state: ICartState, action: PayloadAction<ICart>) {
      const userIndex: number = state.carts.findIndex(function (c: ICart) {
        return c.userEmail === action.payload.userEmail;
      });

      if (userIndex !== -1) {
        const products: IProductCart[] = state.carts[userIndex].product;
        const productIndex: number = products.findIndex(function (
          p: IProductCart
        ) {
          return p.id === action.payload.product[0].id;
        });

        if (productIndex !== -1) {
          const count: number = products[productIndex].count;

          if (count > 1) {
            --state.carts[userIndex].product[productIndex].count;
          } else {
            state.carts[userIndex].product.splice(productIndex, 1);
          }
        }
      }
    },
    cartProductAdd(state: ICartState, action: PayloadAction<ICart>) {
      const userIndex: number = state.carts.findIndex(function (c: ICart) {
        return c.userEmail === action.payload.userEmail;
      });

      if (userIndex !== -1) {
        const products: IProductCart[] = state.carts[userIndex].product;
        const productIndex: number = products.findIndex(function (
          p: IProductCart
        ) {
          return p.id === action.payload.product[0].id;
        });

        if (productIndex === -1) {
          state.carts[userIndex].product.push(action.payload.product[0]);
        } else {
          ++state.carts[userIndex].product[productIndex].count;
        }
      } else {
        state.carts.push(action.payload);
      }
    },
    cartUpdateNoProducts(state: ICartState, action: PayloadAction<string>) {
      const userIndex: number = state.carts.findIndex(function (c: ICart) {
        return c.userEmail === action.payload;
      });
      state.noProducts =
        userIndex === -1 ? 0 : state.carts[userIndex].product.length;
    },
  },
});

const cartReducer = cart.reducer;
export const {
  cartProductRemove,
  cartProductAdd,
  cartUpdateNoProducts,
} = cart.actions;
export default cartReducer;
