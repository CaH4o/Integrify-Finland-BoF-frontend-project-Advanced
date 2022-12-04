import { ICredential } from "./ICredential";
import { IProduct } from "./IProduct";

export interface IProductCart extends IProduct {
  count: number;
}

export interface ICart {
  user: ICredential;
  product: IProductCart[];
}

export interface ICartState {
  carts: ICart[];
  noProducts: number;
}
