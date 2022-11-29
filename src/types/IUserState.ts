import { IUser } from "./IUser";

export interface IUserState {
  users: IUser[];
  loading: boolean;
  error: boolean;
}
