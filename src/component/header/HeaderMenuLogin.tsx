import { useState } from "react";
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
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";

import { ILoginState, IUserCredential } from "../../types/ICredential";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { credentialPostGet } from "../../api/credenitalWorker";

export default function HeaderMenuLogin() {
  const dispatch = useAppDispatch();
  const login: string = useAppSelector(function (state) {
    return state.credential.name;
  });
  const [openModule, setOpenModule] = useState(false);
  const [credentialsValue, setCredentialsValues] = useState<ILoginState>({
    email: "",
    password: "",
    showPassword: false,
  });
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 240,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };

  function handleOpen() {
    setOpenModule(true);
  }
  function handleClose() {
    setOpenModule(false);
  }
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
    handleClose()
  }

  return (
    <div>
      <Button
        size="large"
        variant="outlined"
        color="inherit"
        onClick={handleOpen}
        startIcon={<AccountCircle />}
        sx={{
          border: "none",
          borderRadius: 20,
          textTransform: "none",
          margin: "0.5rem",
        }}
      >
        {login || "Login"}
      </Button>
      <Modal
        open={openModule}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              Please enter your email and password
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
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
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
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
        </Box>
      </Modal>
    </div>
  );
}
