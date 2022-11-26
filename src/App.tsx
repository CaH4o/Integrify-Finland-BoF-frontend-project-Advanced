import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import { Box } from "@mui/material";

import "./styles/App.css";
import AppRouter from "./AppRouter";
import { useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "./redux/store";
import { IThemeState } from "./types/IThemeState";

export default function App(): JSX.Element {
  const themes: IThemeState = useAppSelector(
    (state: RootState) => state.themes
  );
  const theme: Theme = createTheme({
    palette: {
      ...(themes.mode === "light" ? themes.light : themes.dark),
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            bgcolor: "background.default",
            height: "100%",
          }}
        >
          <AppRouter />
        </Box>
      </ThemeProvider>
    </div>
  );
}
