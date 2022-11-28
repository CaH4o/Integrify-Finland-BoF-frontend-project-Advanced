import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
