import { useEffect } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

import HeaderThemeToggle from "./HeaderThemeToggle";
import HeaderSearch from "./HeaderSearch";
import HeaderMenu from "./HeaderMenu";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { credentialPostGet } from "../../api/credenitalWorker";

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const update: boolean = Boolean(
    useAppSelector(function (state) {
      return state.credential.name;
    })
  );

  useEffect(function () {
    if (!update) {
      dispatch(credentialPostGet(undefined!));
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to=".." style={{ color: "inherit", textDecoration: "inherit" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Link>
          <HeaderThemeToggle />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            E-commerce website
          </Typography>
          <HeaderSearch />
          <Box sx={{ flexGrow: 1 }} />
          <HeaderMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
