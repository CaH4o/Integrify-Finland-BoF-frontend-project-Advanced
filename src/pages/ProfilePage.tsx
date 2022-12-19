import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";

import { IUser } from "../types/IUser";
import { ICredentialState } from "../types/ICredentialState";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { usersGet } from "../api/usersWorker";
import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
import ProfileBody from "../component/profiel/ProfileBody";

export default function ProfilePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const credential: ICredentialState = useAppSelector(function (state) {
    return state.credential;
  });
  const user: IUser | undefined = credential.user;
  const getUsers: boolean = credential.rights.users.getAll;

  useEffect(
    function () {
      if (!user) navigate("..");
      if (getUsers) dispatch(usersGet());
    },
    [user]
  );

  return (
    <Stack>
      <Box
        margin="80px 0 100px 0"
        position="relative"
        width="100%"
        minHeight="80vh"
        sx={{ backgroundColor: "background.default" }}
        zIndex="0"
      >
        <ProfileBody />
      </Box>
      <Box position="fixed" top="0" overflow="hidden" width="100%">
        <Header />
      </Box>
      <Box position="fixed" bottom="0" overflow="hidden" width="100%">
        <Footer />
      </Box>
    </Stack>
  );
}
