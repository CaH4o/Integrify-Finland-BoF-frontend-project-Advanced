import { PaletteMode } from "@mui/material";

type tPalette = {
  mode: PaletteMode;
  primary: {
    main: string;
  };
  secondary: {
    main: string;
  };
  divider: string;
  text: {
    primary: string;
    secondary: string;
  };
  background: { default: string };
};

export interface IThemeState {
  light: tPalette;
  dark: tPalette;
  mode: PaletteMode;
}
