import { useEffect } from "react";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import { Box } from "@mui/material";

import "./styles/App.css";
import { RootState } from "./redux/store";
import { IThemeState } from "./types/IThemeState";
import { IUser } from "./types/IUser";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { credentialPostGet } from "./api/credenitalWorker";
import AppRouter from "./AppRouter";

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user: IUser | undefined = useAppSelector(
    (state: RootState) => state.credential.user
  );
  const themes: IThemeState = useAppSelector(
    (state: RootState) => state.themes
  );
  const theme: Theme = createTheme({
    palette: {
      ...(themes.mode === "light" ? themes.light : themes.dark),
    },
  });

  useEffect(function () {
    if (!user) {
      dispatch(credentialPostGet(undefined));
    }
  }, []);

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
