import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { IProduct } from "../../types/IProduct";
import { IProductState } from "../../types/IProductState";
import { useFetch } from "../../hooks/useFetch";

const initialState: IProductState = {
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
        (state: IProductState, action: PayloadAction<IProduct[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.pending, (state: IProductState) => {
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state: IProductState) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "feachProducts",
  async function (url: string) {
    return await useFetch<IProduct[]>(url);
  }
);



const productsReducer = productsSlicer.reducer;
//export const {} = productsSlicer.actions;
export default productsReducer;
