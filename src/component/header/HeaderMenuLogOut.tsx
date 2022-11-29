import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Button,
  Modal,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  IconButton,
} from "@mui/material/";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { logOut } from "../../redux/reducers/credenital";

export default function HeaderMenuLogOut(): JSX.Element {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(logOut());
  }

  return (
    <Button
      size="large"
      variant="outlined"
      color="inherit"
      onClick={handleClick}
      startIcon={<LogoutIcon />}
      sx={{
        border: "none",
        borderRadius: 20,
        textTransform: "none",
        margin: "0.5rem -0.5rem",
      }}
    ></Button>
  );
}
