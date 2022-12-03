import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProduct } from "../../types/IProduct";
import { IProductState } from "../../types/IProductState";
import {
  productsPost,
  productsGet,
  productsPut,
  productsDelete,
} from "../../api/productsWorker";

const initialState: IProductState = {
  backUp: [],
  present: [],
  single: [],
  loading: false,
  error: false,
  page: 1,
  sortDir: {
    byCategories: "asc",
    byPrice: "asc",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productFavoritAddRemove(
      state: IProductState,
      action: PayloadAction<number>
    ) {
      state.backUp.forEach((product: IProduct) => {
        if (product.id === action.payload) {
          product.favorite = !product.favorite;
        }
      });
      state.present.forEach((product: IProduct) => {
        if (product.id === action.payload) {
          product.favorite = !product.favorite;
        }
      });

      if (state.single.length && action.payload === state.single[0].id) {
        state.single[0].favorite = !state.single[0].favorite;
      }
    },
    productsSortByCategories(state: IProductState) {
      const direction: "asc" | "desc" = state.sortDir.byCategories;
      if (direction === "asc") {
        state.present.sort(function (a: IProduct, b: IProduct): number {
          return a.category.name.localeCompare(b.category.name);
        });
      } else {
        state.present.sort(function (a: IProduct, b: IProduct): number {
          return b.category.name.localeCompare(a.category.name);
        });
      }
      state.sortDir.byCategories = direction === "asc" ? "desc" : "asc";
      state.sortDir.byPrice = "asc";
      state.page = 1;
    },
    productsSortByPrice(state: IProductState) {
      const direction: "asc" | "desc" = state.sortDir.byPrice;
      if (direction === "asc") {
        state.present.sort(function (a: IProduct, b: IProduct): number {
          return a.price - b.price;
        });
      } else {
        state.present.sort(function (a: IProduct, b: IProduct): number {
          return b.price - a.price;
        });
      }
      state.sortDir.byPrice = direction === "asc" ? "desc" : "asc";
      state.sortDir.byCategories = "asc";
      state.page = 1;
    },
    productsSetPage(state: IProductState, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    productsSearch(state: IProductState, action: PayloadAction<string>) {
      const products: IProduct[] = state.backUp.filter(function (p: IProduct) {
        return (
          p.title +
          "|" +
          p.description +
          "|" +
          p.price.toString() +
          "|" +
          p.category.name
        )
          .toLocaleLowerCase()
          .includes(action.payload.toLocaleLowerCase());
      });
      state.present = products.length
        ? products
        : JSON.parse(JSON.stringify(state.backUp));
      state.page = 1;
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(
        productsGet.fulfilled,
        (
          state: IProductState,
          action: PayloadAction<IProduct[] | IProduct>
        ) => {
          if (Array.isArray(action.payload)) {
            state.backUp = action.payload.map((product: IProduct) => {
              return { ...product, favorit: false };
            });
          } else {
            state.single = [action.payload].map((product: IProduct) => {
              return { ...product, favorit: false };
            });
          }
          state.present = JSON.parse(JSON.stringify(state.backUp));
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

const productsReducer = productsSlice.reducer;
export const {
  productFavoritAddRemove,
  productsSortByCategories,
  productsSortByPrice,
  productsSetPage,
  productsSearch,
} = productsSlice.actions;
export default productsReducer;
