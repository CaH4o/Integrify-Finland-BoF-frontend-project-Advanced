import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { tProduct } from "../../types/tProduct";
import { tReducerProducts } from "../../types/tReducerProducts";
import { useFetch } from "../../hooks/useFetch";

const initialState: tReducerProducts = {
  products: [],
  loading: false,
  error: false,
};

const productsSlicer = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(
        fetchProducts.fulfilled,
        (state: tReducerProducts, action: PayloadAction<tProduct[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.pending, (state: tReducerProducts) => {
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state: tReducerProducts) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "feachProducts",
  async function (url: string) {
    return await useFetch<tProduct[]>(url);
  }
);

const productsReducer = productsSlicer.reducer;
//export const {} = productsSlicer.actions;
export default productsReducer;
