import { ChangeEvent, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

import { IUser, IUserUpdate } from "../../types/IUser";
import { tRight } from "../../types/ICredential";
import { ICredentialState } from "../../types/ICredentialState";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { userPut } from "../../api/usersWorker";
import ProfileBodyUsers from "./ProfileBodyUsers";

export default function ProfileBody(): JSX.Element {
  const dispatch = useAppDispatch();
  const credential: ICredentialState = useAppSelector(function (state) {
    return state.credential;
  });
  const currentUser: IUser | undefined = credential.user;
  const rights: tRight = credential.rights;
  const [user, setUser] = useState<IUser>(currentUser!);
  const [editMode, setEditMode] = useState<boolean>(false);

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  const handleChangeInput =
    (prop: keyof IUser) => (event: ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [prop]: event.target.value });
    };

  function handleUpdate() {
    if (editMode) {
      if (user.name === currentUser?.name) return;
      const userSend: IUserUpdate = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      dispatch(userPut(userSend));
    } else {
      setUser(currentUser!);
    }
    toggleEditMode();
  }

  function handleReset() {
    const newPassword: string = Math.random().toString(36).substring(2, 9);
    const userSend: IUserUpdate = {
      id: user.id,
      password: newPassword,
    };
    dispatch(userPut(userSend));
    window.open(
      `mailto:${user.email}?subject="E commerce website. New password"&body="New password: ${newPassword}"`
    );
    console.log(newPassword);
  }

  return (
    <>
      {!user ? (
        <Typography color="primary">Loading...</Typography>
      ) : (
        <Box>
          {editMode ? (
            <Typography variant="h5" color="error">
              Edit your profile
            </Typography>
          ) : (
            <Typography variant="h5" color="primary">
              View your profile
            </Typography>
          )}
          <Box display="flex" padding="2rem" gap="1rem" justifyContent="center">
            <Box role="avatar">
              <img
                src="https://api.lorem.space/image/face?w=640&h=480&r=4600"
                width="400"
                alt={user.name}
              />
            </Box>
            <Box display="flex" flexDirection="column" gap="1rem" margin="1rem">
              <TextField
                required
                type="text"
                label="Name"
                disabled={!editMode}
                value={user.name}
                onChange={handleChangeInput("name")}
              />
              <TextField
                required
                type="email"
                label="Email"
                disabled={!editMode}
                value={user.email}
                onChange={handleChangeInput("email")}
              />
              <Button
                variant="contained"
                sx={{ p: "1rem" }}
                onClick={handleUpdate}
              >
                {editMode ? "Update" : "Edit profile"}
              </Button>
              <Button
                variant="contained"
                sx={{ p: "1rem" }}
                onClick={handleReset}
              >
                reset password
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Box
        component="div"
        sx={{ display: rights.users.getAll ? "flex" : "none" }}
        justifyContent="center"
      >
        <ProfileBodyUsers />
      </Box>
    </>
  );
}
