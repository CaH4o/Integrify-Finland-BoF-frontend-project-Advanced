import { useState } from "react";
import {
  Button,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  IconButton,
} from "@mui/material/";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";

import { ILoginState, IUserCredential } from "../../types/ICredential";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { credentialPostGet } from "../../api/credenitalWorker";

export default function HeaderMenuLoginForm({
  handleClose,
}: {
  handleClose(): void;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const [credentialsValue, setCredentialsValues] = useState<ILoginState>({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop: keyof ILoginState) =>
    function (event: React.ChangeEvent<HTMLInputElement>) {
      setCredentialsValues({ ...credentialsValue, [prop]: event.target.value });
    };
  function handleClickShowPassword() {
    setCredentialsValues({
      ...credentialsValue,
      showPassword: !credentialsValue.showPassword,
    });
  }
  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  function hendelSubmit() {
    const { email, password }: IUserCredential = { ...credentialsValue };
    dispatch(credentialPostGet({ email, password }));
    setCredentialsValues({ email: "", password: "", showPassword: false });
    handleClose();
  }

  return (
    <>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          Please enter your email and password
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          type="email"
          value={credentialsValue.email}
          onChange={handleChange("email")}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={credentialsValue.showPassword ? "text" : "password"}
          value={credentialsValue.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {credentialsValue.showPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        type="button"
        onClick={hendelSubmit}
        variant="contained"
        endIcon={<SendIcon />}
        sx={{ m: "1rem" }}
      >
        Send
      </Button>
      <Link
        onClick={handleClose}
        to="/profile"
        style={{ margin: "0.5rem 0", textAlign: "center" }}
      >
        Click to create a new accaunt.
      </Link>
    </>
  );
}
