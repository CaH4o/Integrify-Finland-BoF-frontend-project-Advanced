export interface ICategory {
  id: number;
  name: string;
  image: string;
}

export interface ICategoryState extends Omit<ICategory, "image"> {
  checked: boolean;
}
