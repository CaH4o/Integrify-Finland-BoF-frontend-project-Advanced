import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { tProduct } from "../../types/tProduct";
import { tProductState } from "../../types/tProductState";
import { useFetch } from "../../hooks/useFetch";

const initialState: tProductState = {
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
        (state: tProductState, action: PayloadAction<tProduct[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.pending, (state: tProductState) => {
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state: tProductState) => {
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
