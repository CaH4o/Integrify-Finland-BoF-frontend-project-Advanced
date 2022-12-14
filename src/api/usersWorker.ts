import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IUser } from "../types/IUser";

export const usersGet = createAsyncThunk(
  "usersGet",
  async function (url: string) {
    try {
      const response = await axios.get(url);
      if (response.status < 400) {
        return response.data;
      } else {
        throw new Error(response.status + " " + response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export async function createUser(user: IUser) {
  const response = await axios.post(
    "https://api.escuelajs.co/api/v1/users/",
    user
  );
  if (response.status < 400) {
    return response.data;
  } else {
    throw new Error(response.status + " " + response.statusText);
  }
}

export async function checkUser(user: { email: string }) {
  const response = await axios.post(
    "https://api.escuelajs.co/api/v1/users/is-available",
    user
  );
  if (response.status < 400) {
    return response.data;
  } else {
    throw new Error(response.status + " " + response.statusText);
  }
}
