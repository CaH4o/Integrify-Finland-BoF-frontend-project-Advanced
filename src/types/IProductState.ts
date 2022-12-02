import { IProduct } from "./IProduct";

export interface IProductState {
  backUp: IProduct[];
  present: IProduct[];
  loading: boolean;
  error: boolean;
  page: number;
  sortDir: tSortDir;
}

export type tSortDir = {
  [key: string]: "asc" | "desc";
}
