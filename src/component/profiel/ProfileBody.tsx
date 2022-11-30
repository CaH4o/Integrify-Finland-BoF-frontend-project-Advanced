import { useEffect, useState } from "react";
import { Box, TextField, MenuItem, InputLabel, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { IUser } from "../../types/IUser";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function ProfileBody(): JSX.Element {
  const navigate = useNavigate();
  const currentUser: IUser | undefined = useAppSelector(function (state) {
    return state.credential.user;
  });
  const [user, setUser] = useState<IUser| undefined>(currentUser);

  useEffect(function () {
    if (!currentUser) {
      navigate("..");
    }
  }, []);

  function hendleSubmit() {}

  const handleChange =
    (prop: keyof IUser) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [prop]: event.target.value });
    };

  return (
    <Box component="form" onSubmit={hendleSubmit}>
      <TextField
        required
        type="number"
        label="User Id"
        value={user.id}
        onChange={handleChange("id")}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/* avatar */}
      <img
        src="https://api.lorem.space/image/face?w=640&h=480&r=4600"
        width="400"
      />
      <TextField
        required
        type="text"
        label="Name"
        value={user.name}
        onChange={handleChange("name")}
      />
      {/* email */}
      <TextField
        required
        type="email"
        label="Email"
        value={user.email}
        onChange={handleChange("email")}
      />
      {/* password */}
      <TextField
        required
        type="password"
        label="Password"
        value={user.password}
        onChange={handleChange("password")}
      />
      <TextField
        required
        type="password"
        label="Repeat the password"
        value={user.password}
        onChange={handleChange("password")}
      />
      <InputLabel id="user_role">Role</InputLabel>
      <Select
        required
        sx={{ p: "0 2.5rem" }}
        /*  labelId="user_role"
        id="user_role" */
        value={user.role}
        label="Role"
        defaultValue="customer"
        onChange={(e) => {
          handleChange(
            "role"
          ) as unknown as React.ChangeEvent<HTMLInputElement>;
        }}
      >
        <MenuItem value="customer">Customer</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
    </Box>
  );
}
