import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Box, TextField, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

import { IUser } from "../../types/IUser";
import { tMessageObj } from "../../types/IMessageObj";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function FooterForm(): JSX.Element {
  const user: IUser | undefined = useAppSelector(function (state) {
    return state.credential.user;
  });

  const [messageObj, setMessageObj] = useState<tMessageObj>({
    message: "",
    email: "",
  });

  useEffect(
    function () {
      if (user) {
        setMessageObj({ ...messageObj, email: user.email });
      } else {
        setMessageObj({ ...messageObj, email: "" });
      }
    },
    [user]
  );

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setMessageObj({ ...messageObj, [event.target.name]: [event.target.value] });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (messageObj.message && messageObj.email) {
      window.open(
        `mailto:${messageObj.email}?subject="E commerce website. Feeback sent."&body=${messageObj.message}`
      );
    }
  }

  return (
    <Box
      margin="1rem"
      component="form"
      autoComplete="off"
      display="flex"
      gap={2}
      onSubmit={handleSubmit}
    >
      <TextField
        type="text"
        name="message"
        label="Text of a message"
        placeholder="Dear reciver ..."
        value={messageObj.message}
        onChange={handleChange}
        color="secondary"
      ></TextField>
      <TextField
        type="email"
        name="email"
        label="Your e-mail"
        placeholder="name@domain.com"
        value={messageObj.email}
        onChange={handleChange}
        color="secondary"
      ></TextField>
      <Button
        sx={{ m: 1 }}
        type="submit"
        variant="outlined"
        startIcon={<EmailIcon />}
        color="inherit"
      >
        Send e-mail
      </Button>
    </Box>
  );
}
