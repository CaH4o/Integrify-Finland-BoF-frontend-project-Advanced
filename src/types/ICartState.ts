import { IProduct } from "./IProduct";

export interface IProductCart extends IProduct {
  count: number;
}

export interface ICart {
  userEmail: string;
  product: IProductCart[];
}

export interface ICartState {
  carts: ICart[];
  noProducts: number;
}
