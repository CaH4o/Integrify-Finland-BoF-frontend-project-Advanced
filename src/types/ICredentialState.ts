import { tRight } from "./ICredential";
import { IUser } from "./IUser";

export interface ICredentialState {
  user: IUser | undefined;
  rights: tRight;
  error: boolean;
  loading: boolean;
}
