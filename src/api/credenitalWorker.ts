import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ICredential } from "../types/ICredential";
import { IUserCredential } from "../types/IUser";

export const credentialPost = createAsyncThunk(
  "credentialPost",
  async function (credential: IUserCredential) {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        credential
      );
      if (response.status < 400) {
        const token: ICredential = response.data;
        localStorage.setItem("token", token.access_token);
      } else {
        throw new Error(response.status + " " + response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const credentialGet = createAsyncThunk(
  "credentialGet",
  async function (access_token) {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
