import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  ICredential,
  tRight,
  IUserCredential,
  tRole,
} from "../types/ICredential";

const lsCrdName: string = "otiv1ecomertialsitetokenforuserinlocalstorage";

export const credentialPostGet = createAsyncThunk(
  "credentialPost",
  async function (credential?: IUserCredential) {
    let jwtToken: ICredential = { access_token: "" };
    jwtToken.access_token = localStorage.getItem(lsCrdName) || "";

    if (credential) {
      try {
        const response = await axios.post(
          "https://api.escuelajs.co/api/v1/auth/login",
          credential
        );
        if (response.status < 400) {
          jwtToken = response.data;
          setLocalCredential(jwtToken.access_token);
        } else {
          throw new Error(response.status + " " + response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (jwtToken.access_token) {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${jwtToken.access_token}`,
            },
          }
        );
        if (response.status < 400) {
          return response.data;
        } else {
          throw new Error(response.status + " " + response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
);

export function setLocalCredential(token: string = "") {
  localStorage.setItem(lsCrdName, token);
}

export function setRights(role: tRole = "customer"): tRight {
  const rights: tRight = {
    users: { create: false, read: false, update: false, delete: false },
    products: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
  };
  switch (role) {
    case "admin":
      rights.users.create = true;
      rights.users.read = true;
      rights.users.update = true;
      rights.users.delete = true;
      rights.products.create = true;
      rights.products.read = true;
      rights.products.update = true;
      rights.products.delete = true;
      break;
    case "customer":
      rights.users.create = false;
      rights.users.read = false;
      rights.users.update = false;
      rights.users.delete = false;
      rights.products.create = false;
      rights.products.read = true;
      rights.products.update = false;
      rights.products.delete = false;
      break;
    default:
      break;
  }
  return rights;
}
