import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { IProductCreate, IProduct } from "../types/IProduct";

const urls: { [key: string]: string } = {
  productCreate: "https://api.escuelajs.co/api/v1/products/",
};

export const productsPost = createAsyncThunk(
  "productsCreate",
  async function (data: IProductCreate) {
    const response = await axios.post(urls.productCreate, data);
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

export function initProduct(): IProduct {
  return {
    id: 0,
    title: "",
    description: "",
    price: 0,
    images: [],
    favorite: false,
    category: {
      id: 1,
      name: "",
      image: "",
    },
  };
}
