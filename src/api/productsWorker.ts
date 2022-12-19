import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { IProductCreate, IProductUpdate, IProduct } from "../types/IProduct";
import { ICartState } from "../types/ICartState";

const lsPrdName: string = "otiv1ecomertialsitetokenforproductsinlocalstorage";
const lsPrdCrt: string = "otiv1ecomertialsitetokenforcartsinlocalstorage";
const urls: { [key: string]: string } = {
  products: "https://api.escuelajs.co/api/v1/products/",
  categories: "https://api.escuelajs.co/api/v1/categories",
};

export const productsPost = createAsyncThunk(
  "productsCreate",
  async function (data: IProductCreate) {
    const response = await axios.post(urls.products, data);
    if (response.status >= 400) {
      throw new Error(response.status + " " + response.statusText);
    } else {
      return response.data;
    }
  }
);

export const productsGet = createAsyncThunk(
  "productsGet",
  async function (id: string) {
    const response = await axios.get(urls.products + id);
    if (response.status >= 400) {
      throw new Error(response.status + " " + response.statusText);
    } else {
      return response.data;
    }
  }
);

export const productsPut = createAsyncThunk(
  "productsUpdate",
  async function (data: IProductUpdate) {
    const response = await axios.put(urls.products + data.id.toString(), data);
    if (response.status >= 400) {
      throw new Error(response.status + " " + response.statusText);
    } else {
      return response.data;
    }
  }
);

export const productsDelete = createAsyncThunk(
  "productsDelete",
  async function (id: number) {
    const response = await axios.delete(urls.products + id);
    if (response.status >= 400) {
      throw new Error(response.status + " " + response.statusText);
    } else {
      return response.data;
    }
  }
);

export const categoriesGet = createAsyncThunk(
  "categoriesGet",
  async function () {
    const response = await axios.get(urls.categories);
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

export function setLocalProductFevorit(product: IProduct[]) {
  const sendProduct: IProduct[] = product.filter(function (p: IProduct) {
    return p.favorite;
  });
  localStorage.setItem(lsPrdName, JSON.stringify(sendProduct));
}

export function getLocalProductFevorit(): IProduct[] {
  return JSON.parse(localStorage.getItem(lsPrdName) || "[]");
}

export function setLocalProductFevoritSingle(product: IProduct) {
  if (!product.id || !product.favorite) return;

  const sendProduct: IProduct[] = getLocalProductFevorit();
  const index: number = sendProduct.findIndex(function (p: IProduct) {
    return p.id === product.id;
  });

  if (index === -1) {
    sendProduct.push(product);
  } else {
    sendProduct[index].favorite = product.favorite;
  }

  localStorage.setItem(lsPrdName, JSON.stringify(sendProduct));
}

export function setLocalProductCart(carts: ICartState) {
  localStorage.setItem(lsPrdCrt, JSON.stringify(carts));
}

export function getLocalProductCart(): ICartState {
  return JSON.parse(
    localStorage.getItem(lsPrdCrt) ||
      JSON.stringify({ carts: [], noProducts: 0 })
  );
}
