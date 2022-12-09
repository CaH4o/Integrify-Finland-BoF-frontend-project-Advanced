import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProduct } from "../../types/IProduct";
import { IProductState } from "../../types/IProductState";
import { ICategoryState, ICategory } from "../../types/ICategoty";
import {
  productsPost,
  productsGet,
  productsPut,
  productsDelete,
  categoriesGet,
} from "../../api/productsWorker";

const initialState: IProductState = {
  backUp: [],
  present: [],
  single: [],
  categories: [],
  loading: false,
  error: false,
  page: 1,
  sortDir: {
    byCategories: "asc",
    byPrice: "asc",
  },
  filters: {
    search: "",
    categories: [],
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
      state.filters.search = action.payload;
    },
    productsSelectCategories(
      state: IProductState,
      action: PayloadAction<number>
    ) {
      state.filters.categories.forEach(function (c: ICategoryState) {
        if (c.id === action.payload) {
          c.checked = !c.checked;
        }
      });
    },
    productUpdatePresent(state: IProductState) {
      let products: IProduct[] = state.backUp;
      const search: string = state.filters.search;
      const checkedId: number[] = [];

      state.filters.categories.forEach(function (c: ICategoryState) {
        if (c.checked) {
          checkedId.push(c.id);
        }
      });

      if (checkedId.length) {
        products = products.filter(function (p: IProduct) {
          return checkedId.includes(p.category.id);
        });
      }

      if (search) {
        products = products.filter(function (p: IProduct) {
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
            .includes(search.toLocaleLowerCase());
        });
      }

      state.present = products;
      state.page = 1;
    },
    productReset(state: IProductState) {
      state.filters.search = "";
      state.filters.categories.forEach(function (c: ICategoryState) {
        c.checked = false;
      });
      state.present = JSON.parse(JSON.stringify(state.backUp));
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
    builder
      .addCase(
        categoriesGet.fulfilled,
        (state: IProductState, action: PayloadAction<ICategory[]>) => {
          state.categories = action.payload;
          state.filters.categories = action.payload.map(function (
            c: ICategory
          ) {
            const filtersCategories: ICategoryState = {
              name: c.name,
              id: c.id,
              checked: false,
            };
            return filtersCategories;
          });
          state.loading = false;
        }
      )
      .addCase(categoriesGet.pending, (state: IProductState) => {
        state.loading = true;
      })
      .addCase(categoriesGet.rejected, (state: IProductState) => {
        state.loading = false;
        state.error = true;
      });
  },
});

const productsReducer = productsSlice.reducer;
export const {
  productFavoritAddRemove,
  productsSelectCategories,
  productsSortByCategories,
  productsSortByPrice,
  productsSetPage,
  productsSearch,
  productUpdatePresent,
  productReset,
} = productsSlice.actions;
export default productsReducer;
