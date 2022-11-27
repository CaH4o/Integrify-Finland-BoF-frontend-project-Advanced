import { IProduct } from "./IProduct";

export interface IProductState {
  products: IProduct[];
  loading: boolean;
  error: boolean;
  sortDir: ISortDir;
}

export interface ISortDir {
  [key: string]: "asc" | "desc";
}
