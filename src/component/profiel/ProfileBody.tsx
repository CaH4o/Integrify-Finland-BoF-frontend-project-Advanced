import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  Button,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { IUser } from "../../types/IUser";
import { tRight, tRole } from "../../types/ICredential";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function ProfileBody(): JSX.Element {
  const navigate = useNavigate();
  const currentUser: IUser | undefined = useAppSelector(function (state) {
    return state.credential.user;
  });
  const rights: tRight = useAppSelector(function (state) {
    return state.credential.rights;
  });
  const [user, setUser] = useState<IUser>(currentUser!);

  useEffect(function () {
    if (!currentUser) {
      navigate("..");
    }
  }, [currentUser]);

  function hendleSubmit() {}

  function handleChangeSelect(event: SelectChangeEvent) {
    setUser({ ...user, role: event.target.value as tRole });
  }

  const handleChangeInput =
    (prop: keyof IUser) => (event: ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [prop]: event.target.value });
    };

  return (
    <>
      {!user ? (
        <p>Loading</p>
      ) : (
        <Box
          component="form"
          onSubmit={hendleSubmit}
          display="flex"
          padding="2rem"
          gap="1rem"
          justifyContent="center"
        >
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
              value={user.name}
              onChange={handleChangeInput("name")}
            />
            <TextField
              required
              disabled={!rights.users.create}
              type="email"
              label="Email"
              value={user.email}
              onChange={handleChangeInput("email")}
            />
            <TextField
              required
              type="password"
              label="Password"
              value={user.password}
              onChange={handleChangeInput("password")}
            />
            <TextField
              required
              type="password"
              label="Repeat the password"
              //value={user.password}
              //onChange={handleChangeInput("password")}
            />
          </Box>
          <Box display="flex" flexDirection="column" gap="1rem" margin="1rem">
            <TextField
              required
              disabled={!rights.users.create}
              type="number"
              label="User Id"
              value={user.id}
              onChange={handleChangeInput("id")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="user_role">Role * </InputLabel>
              <Select
                required
                sx={{ p: "0 2.5rem" }}
                id="user_role"
                value={user.role}
                label="Role"
                onChange={handleChangeSelect}
                disabled={rights.users.create}
              >
                <MenuItem value="customer">customer</MenuItem>
                <MenuItem value="admin">admin</MenuItem>
              </Select>
            </FormControl>

            <Button disabled={rights.users.create}>Create</Button>
            <Button disabled={rights.users.update}>Update</Button>
          </Box>
        </Box>
      )}
    </>
  );
}
