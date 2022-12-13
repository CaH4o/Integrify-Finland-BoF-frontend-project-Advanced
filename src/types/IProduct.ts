import { ICategory } from "./ICategoty";

export interface IProductClear {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ICategory;
  images: string[];
}

export interface IProduct extends IProductClear {
  favorite: boolean;
}

export interface IProductCreate extends Omit<IProductClear, "id" | "category"> {
  categoryId: number;
}

export interface IProductUpdate {
  id: number;
  title?: string;
  price?: number;
  description?: string;
  category?: ICategory;
  categoryId?: number;
  images?: string[];
}

export interface IProductLS
  extends Omit<
    IProduct,
    "title" | "category" | "price" | "description" | "images"
  > {}
