export interface ICredential {
  access_token: string;
}

export interface IUserCredential {
  email: string;
  password: string;
}

export interface ILoginFormState extends IUserCredential {
  showPassword: boolean;
  name: string;
}

export type tRole = "customer" | "admin";

export type tRightType = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

export type tRight = {
  [key: string]: tRightType;
};
