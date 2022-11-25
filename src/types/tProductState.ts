import { tProduct } from "./tProduct";

export type tProductState = {
    products: tProduct[];
    loading: boolean;
    error: boolean;
  };
  