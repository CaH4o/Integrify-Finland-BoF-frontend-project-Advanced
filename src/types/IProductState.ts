import { IProduct } from "./IProduct";

export interface IProductState {
  products: IProduct[];
  loading: boolean;
  error: boolean;
}
