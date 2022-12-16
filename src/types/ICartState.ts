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

export interface IUserProduct extends Omit<ICart, "product"> {
  product: IProductCart;
}
