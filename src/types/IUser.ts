import { IUserCredential, tRole } from "./ICredential";

export interface IUser extends IUserCredential {
  id: number;
  name: string;
  role: tRole;
  avatar: string;
}
