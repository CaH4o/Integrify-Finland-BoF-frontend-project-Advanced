import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IUser, IUserUpdate } from "../types/IUser";

const urls: { [key: string]: string } = {
  users: "https://api.escuelajs.co/api/v1/users/",
  userIsAvailable: "https://api.escuelajs.co/api/v1/users/is-available",
};

export const usersGet = createAsyncThunk("usersGet", async function () {
  const response = await axios.get(urls.users);
  if (response.status < 400) {
    return response.data;
  } else {
    throw new Error(response.status + " " + response.statusText);
  }
});

export const userPut = createAsyncThunk("userUpdate", userUpdate);

export async function userUpdate(user: IUserUpdate) {
  const response = await axios.put(urls.users + user.id.toString(), user);

  if (response.status < 400) {
    return response.data;
  } else {
    throw new Error(response.status + " " + response.statusText);
  }
}

export async function createUser(user: IUser) {
  const response = await axios.post(urls.users, user);
  if (response.status < 400) {
    return response.data;
  } else {
    throw new Error(response.status + " " + response.statusText);
  }
}

export async function checkUser(user: { email: string }) {
  const response = await axios.post(urls.userIsAvailable, user);
  if (response.status < 400) {
    return response.data;
  } else {
    throw new Error(response.status + " " + response.statusText);
  }
}
