import { IProduct } from "./IProduct";

export interface IProductState {
  products: IProduct[];
  loading: boolean;
  error: boolean;
  sortDir: {
    byCategories: "asc" | "desc",
    byPrice: "asc" | "desc",
  }
}
