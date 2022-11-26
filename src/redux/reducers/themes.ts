import { createSlice } from "@reduxjs/toolkit";

import { IThemeState } from "../../types/IThemeState";

const initialState: IThemeState = {
  light: {
    mode: "light",
    primary: { main: "#D0B8A8" },
    secondary: { main: "#F8EDE3" },
    divider: "#DFD3C3",
    text: {
      primary: "#7D6E83",
      secondary: "#7D6E83",
    },
    background: { default: "#fff" },
  },
  dark: {
    mode: "dark",
    primary: { main: "#9F73AB" },
    secondary: { main: "#3F3B6C" },
    divider: "#624F82",
    text: {
      primary: "#A3C7D6",
      secondary: "#A3C7D6",
    },
    background: { default: "#000" },
  },
  mode: "light",
};

const themesSlicer = createSlice({
  name: "themes",
  initialState,
  reducers: {
    toggleColorMode: function (state: IThemeState) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

const themesReducer = themesSlicer.reducer;
export const { toggleColorMode } = themesSlicer.actions;
export default themesReducer;
