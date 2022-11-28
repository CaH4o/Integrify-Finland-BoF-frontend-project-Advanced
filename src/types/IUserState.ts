import { IUser } from "./IUser";

export interface IUserState {
  currentUser: IUser | undefined;
  users: IUser[];
}
