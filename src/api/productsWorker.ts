import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { IProduct } from "../types/IProduct";

export const productsPost = createAsyncThunk(
  "productsPost",
  async function ({ url, data }: { url: string; data: IProduct }) {
    const response = await axios.post(url, data);
    if (response.status >= 400) {
      throw new Error(response.status + " " + response.statusText);
    } else {
      return response.data;
    }
  }
);

export const productsGet = createAsyncThunk(
  "productsGet",
  async function (url: string) {
    const response = await axios.get(url);
    if (response.status >= 400) {
      throw new Error(response.status + " " + response.statusText);
    } else {
      return response.data;
    }
  }
);

export const productsPut = createAsyncThunk(
  "productsPut",
  async function ({ url, data }: { url: string; data: IProduct }) {
    const response = await axios.put(url, data);
    if (response.status >= 400) {
      throw new Error(response.status + " " + response.statusText);
    } else {
      return response.data;
    }
  }
);

export const productsDelete = createAsyncThunk(
  "productsDelete",
  async function (url: string) {
    const response = await axios.delete(url);
    if (response.status >= 400) {
      throw new Error(response.status + " " + response.statusText);
    } else {
      return response.data;
    }
  }
);

export const categoriesGet = createAsyncThunk(
  "categoriesGet",
  async function (url: string) {
    const response = await axios.get(url);
    if (response.status >= 400) {
      throw new Error(response.status + " " + response.statusText);
    } else {
      return response.data;
    }
  }
);
