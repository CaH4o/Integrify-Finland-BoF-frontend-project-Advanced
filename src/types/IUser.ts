export type tRole = "customer" | "admin";

export interface IUserCredential {
  email: string;
  password: string;
}

export interface IUser extends IUserCredential {
  id: number;
  name: string;
  role: tRole;
  avatar: string;
}

