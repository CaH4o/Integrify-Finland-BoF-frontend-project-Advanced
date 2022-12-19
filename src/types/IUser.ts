import { IUserCredential, tRole } from "./ICredential";

export interface IUser extends IUserCredential {
  id: number;
  name: string;
  role: tRole;
  avatar: string;
}

export interface IUserUpdate extends Omit<IUserCredential, "password" | "email">  {
  id: number;
  password?: string
  email?: string
  name?: string;
  role?: tRole;
  avatar?: string;
}
