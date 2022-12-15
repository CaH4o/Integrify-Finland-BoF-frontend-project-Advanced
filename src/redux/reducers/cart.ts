import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICart, ICartState, IProductCart } from "../../types/ICartState";
import { IProduct } from "../../types/IProduct";
import { ICredential } from "../../types/ICredential";
import { getLocalCredential } from "../../api/credenitalWorker";

const initialState: ICartState = { carts: [], noProducts: 0 };

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartProductRemove(state: ICartState, action: PayloadAction<number>) {
      const userCredential: ICredential = getLocalCredential();
      const userIndex: number = state.carts.findIndex(function (c: ICart) {
        return c.user.access_token === userCredential.access_token;
      });

      if (userIndex !== -1) {
        const products: IProductCart[] = state.carts[userIndex].product;
        const productIndex: number = products.findIndex(function (
          p: IProductCart
        ) {
          return p.id === action.payload;
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

    cartProductAdd(state: ICartState, action: PayloadAction<IProduct>) {
      const userCredential: ICredential = getLocalCredential();
      const userIndex: number = state.carts.findIndex(function (c: ICart) {
        return c.user.access_token === userCredential.access_token;
      });

      if (userIndex !== -1) {
        const products: IProductCart[] = state.carts[userIndex].product;
        const productIndex: number = products.findIndex(function (
          p: IProductCart
        ) {
          return p.id === action.payload.id;
        });

        if (productIndex === -1) {
          state.carts[userIndex].product.push({ ...action.payload, count: 1 });
        } else {
          ++state.carts[userIndex].product[productIndex].count;
        }
      } else {
        state.carts.push({
          user: userCredential,
          product: [{ ...action.payload, count: 1 }],
        });
      }
    },

    cartUpdateNoProducts(state: ICartState) {
      const userCredential: ICredential = getLocalCredential();
      const userIndex: number = state.carts.findIndex(function (c: ICart) {
        return c.user.access_token === userCredential.access_token;
      });
      state.noProducts =
        userIndex === -1 ? 0 : state.carts[userIndex].product.length;
    },
  },
});

const cartReducer = cart.reducer;
export const { cartProductRemove, cartProductAdd, cartUpdateNoProducts } =
  cart.actions;
export default cartReducer;
