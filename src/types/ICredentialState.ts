import { tRight } from "./ICredential";

export interface ICredentialState {
  name: string;
  rights: tRight;
  error: boolean;
  loading: boolean;
}
