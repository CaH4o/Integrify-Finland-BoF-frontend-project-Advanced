import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import { Box } from "@mui/material";

import "./styles/App.css";
import AppRouter from "./AppRouter";
import { useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "./redux/store";
import { tThemeState } from "./types/tThemeState";

export default function App() {
  const themes: tThemeState = useAppSelector(
    (state: RootState) => state.themes
  );
  const theme: Theme = createTheme({
    palette: {
      ...(themes.mode === "light" ? themes.light : themes.dark),
    },
  });

  return (
    <Box className="App">
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Box>
  );
}
