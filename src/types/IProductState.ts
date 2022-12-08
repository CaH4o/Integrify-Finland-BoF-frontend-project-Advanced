import { ICategoryState } from "./ICategoty";
import { IProduct } from "./IProduct";

export interface IProductState {
  backUp: IProduct[];
  present: IProduct[];
  single: IProduct[];
  categories: ICategoryState[];
  loading: boolean;
  error: boolean;
  page: number;
  sortDir: tSortDir;
}

export type tSortDir = {
  [key: string]: "asc" | "desc";
};
