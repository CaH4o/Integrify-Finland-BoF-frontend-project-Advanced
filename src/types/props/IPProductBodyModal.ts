import { IProduct } from "../IProduct";

export type tModeProduct = "update" | "create";

export interface IPProductBodyModal {
  product?: IProduct;
  option: tModeProduct;
}
