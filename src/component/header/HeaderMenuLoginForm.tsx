import { useState, FormEvent } from "react";
import {
  Box,
  Button,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material/";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";

import { IUser } from "../../types/IUser";
import { ILoginFormState } from "../../types/ICredential";
import {
  IPHeaderMenuLoginForm,
  tModeLogin,
} from "../../types/props/IPHeaderMenuLoginForm";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { credentialPostGet } from "../../api/credenitalWorker";
import { checkUser, createUser } from "../../api/usersWorker";

function initCredentialsValues(): ILoginFormState {
  return {
    email: "",
    password: "",
    showPassword: false,
    name: "",
  };
}

function HeaderMenuLoginForm(params: IPHeaderMenuLoginForm): JSX.Element {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<tModeLogin>("login");
  const [message, setMessge] = useState<string>("");
  const [credentialsValue, setCredentialsValues] = useState<ILoginFormState>(
    initCredentialsValues()
  );

  const handleChange = (prop: keyof ILoginFormState) =>
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

  function toggleMode() {
    setMode(mode === "registration" ? "login" : "registration");
    setCredentialsValues(initCredentialsValues());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { name, email, password } = {
      ...credentialsValue,
    };

    if (mode === "registration") {
      const check: { isAvailable: boolean } = await checkUser({ email });

      if (check.isAvailable) {
        const newUser: IUser = {
          name: name,
          email: email,
          password: password,
          id: 0,
          role: "customer",
          avatar:
            "https://i0.wp.com/errori.net/wp-content/uploads/2021/02/avatar.jpg",
        };
        await createUser(newUser);
      } else {
        setMessge("email is not available");
        setTimeout(() => setMessge(""), 2000);
        return;
      }
    }

    dispatch(credentialPostGet({ email, password }));
    setCredentialsValues(initCredentialsValues());
    params.handleClose();
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap="1rem"
    >
      <Typography color="primary" textAlign="center">
        {mode === "login"
          ? "Please enter your email and password"
          : "Please enter your name, email and password"}
      </Typography>
      {mode === "registration" && (
        <>
          <TextField
            required
            variant="standard"
            label="Name"
            type="text"
            value={credentialsValue.name}
            onChange={handleChange("name")}
          />
        </>
      )}
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
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
      {message.length > 0 && (
        <Typography color="error" textAlign="center">
          {message}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
        sx={{ m: "1rem" }}
      >
        Send
      </Button>
      <Button
        type="button"
        onClick={toggleMode}
        style={{
          margin: "0.5rem 0",
          textTransform: "none",
        }}
      >
        {mode === "registration"
          ? "I have an account"
          : "Create an new accaunt"}
      </Button>
    </Box>
  );
}

export default HeaderMenuLoginForm;
