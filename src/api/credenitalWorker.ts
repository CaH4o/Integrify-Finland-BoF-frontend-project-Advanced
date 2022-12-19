import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  ICredential,
  tRight,
  IUserCredential,
  tRole,
} from "../types/ICredential";

const lsCrdName: string = "otiv1ecomertialsitetokenforuserinlocalstorage";
const urls: { [key: string]: string } = {
  login: "https://api.escuelajs.co/api/v1/auth/login",
  profile: "https://api.escuelajs.co/api/v1/auth/profile",
};

export const credentialPostGet = createAsyncThunk(
  "credentialPost",
  async function (credential: IUserCredential | undefined) {
    let jwtToken: ICredential = getLocalCredential();

    if (credential) {
      const response = await axios.post(urls.login, credential);
      if (response.status < 400) {
        jwtToken = response.data;
        setLocalCredential(jwtToken.access_token);
      } else {
        throw new Error(response.status + " " + response.statusText);
      }
    }

    if (jwtToken.access_token) {
      const response = await axios.get(urls.profile, {
        headers: {
          Authorization: `Bearer ${jwtToken.access_token}`,
        },
      });
      if (response.status < 400) {
        return response.data;
      } else {
        throw new Error(response.status + " " + response.statusText);
      }
    }
  }
);

export function setLocalCredential(token: string = "") {
  localStorage.setItem(lsCrdName, token);
}

export function getLocalCredential(): ICredential {
  return { access_token: localStorage.getItem(lsCrdName) || "" };
}

export function setRights(role: tRole | ""): tRight {
  const rights: tRight = {
    user: { openProfile: false, update: false },
    users: { getAll: false, update: false, create: false },
    products: { create: false, update: false, delete: false },
    category: { get: false, create: false, update: false, delete: false },
  };

  switch (role) {
    case "admin":
      rights.user.openProfile = true;
      rights.user.update = true;
      rights.users.getAll = true;
      rights.users.update = true;
      rights.users.create = true;
      rights.products.create = true;
      rights.products.update = true;
      rights.products.delete = true;
      rights.category.get = true;
      rights.category.create = true;
      rights.category.update = true;
      rights.category.delete = true;
      break;
    case "customer":
      rights.user.openProfile = true;
      rights.user.update = true;
      break;
    case "manager":
      rights.user.openProfile = true;
      rights.user.update = true;
      rights.products.create = true;
      rights.products.update = true;
      rights.products.delete = true;
      rights.category.get = true;
      rights.category.create = true;
      rights.category.update = true;
      rights.category.delete = true;
      break;
    default:
      break;
  }

  return rights;
}
