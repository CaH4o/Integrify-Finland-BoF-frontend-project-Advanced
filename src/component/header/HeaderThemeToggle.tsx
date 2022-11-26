import { IconButton, PaletteMode } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toggleColorMode } from "../../redux/reducers/themes";
import { RootState } from "../../redux/store";

export default function HeaderThemeToggle(): JSX.Element {
  const dispatch = useAppDispatch();
  const mode: PaletteMode = useAppSelector(
    (state: RootState) => state.themes.mode
  );

  return (
    <IconButton
      edge="start"
      //color="inherit"
      sx={{ mr: 2 }}
      onClick={() => {
        dispatch(toggleColorMode());
      }}
    >
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
