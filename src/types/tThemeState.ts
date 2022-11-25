import { PaletteMode } from "@mui/material";

type tPlate = {
  mode: PaletteMode;
  primary: {
    main: string;
  };
  secondary: {
    main: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  background: { default: string };
};

export interface tThemeState {
  light: tPlate;
  dark: tPlate;
  mode: PaletteMode;
}
