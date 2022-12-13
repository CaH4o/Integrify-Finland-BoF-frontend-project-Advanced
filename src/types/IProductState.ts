import { ICategory, ICategoryState } from "./ICategoty";
import { IProduct } from "./IProduct";

export interface IProductState {
  backUp: IProduct[];
  present: IProduct[];
  single: IProduct;
  categories: ICategory[];
  loading: boolean;
  error: boolean;
  page: number;
  sortDir: tSortDir;
  filters: tFilters;
}

export type tSortDir = {
  [key: string]: "asc" | "desc";
};

export type tFilters = {
  search: string;
  categories: ICategoryState[];
  favorite: "on" | "off";
};
