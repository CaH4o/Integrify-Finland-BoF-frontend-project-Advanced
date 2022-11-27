import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProduct } from "../../types/IProduct";
import { IProductState } from "../../types/IProductState";
import {
  productsPost,
  productsGet,
  productsPut,
  productsDelete,
} from "../../api/apiWorker";

const initialState: IProductState = {
  products: [],
  loading: false,
  error: false,
  sortDir: {
    byCategories: "asc",
    byPrice: "asc",
  },
};

const productsSlicer = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsSortByCategories(state: IProductState) {
      const direction: "asc" | "desc" = state.sortDir.byCategories;
      if (direction === "asc") {
        state.products.sort(function (a: IProduct, b: IProduct): number {
          return a.category.name.localeCompare(b.category.name);
        });
      } else {
        state.products.sort(function (a: IProduct, b: IProduct): number {
          return b.category.name.localeCompare(a.category.name);
        });
      }
      state.sortDir.byCategories = direction === "asc" ? "desc" : "asc";
      state.sortDir.byPrice = "asc";
    },
    productsSortByPrice(state: IProductState) {
      const direction: "asc" | "desc" = state.sortDir.byPrice;
      if (direction === "asc") {
        state.products.sort(function (a: IProduct, b: IProduct): number {
          return a.price - b.price;
        });
      } else {
        state.products.sort(function (a: IProduct, b: IProduct): number {
          return b.price - a.price;
        });
      }
      state.sortDir.byPrice = direction === "asc" ? "desc" : "asc";
      state.sortDir.byCategories = "asc";
    },
  },
  extraReducers: (build) => {
    build
      .addCase(
        productsGet.fulfilled,
        (state: IProductState, action: PayloadAction<IProduct[]>) => {
          if (Array.isArray(action.payload)) {
            state.products = action.payload;
          } else {
            state.products = [action.payload];
          }
          state.loading = false;
        }
      )
      .addCase(productsGet.pending, (state: IProductState) => {
        state.loading = true;
      })
      .addCase(productsGet.rejected, (state: IProductState) => {
        state.loading = false;
        state.error = true;
      });
  },
});

const productsReducer = productsSlicer.reducer;
export const { productsSortByCategories, productsSortByPrice } =
  productsSlicer.actions;
export default productsReducer;
