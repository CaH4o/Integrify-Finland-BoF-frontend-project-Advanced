import { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";

import { IUser, IUserUpdate } from "../../types/IUser";
import { tRole } from "../../types/ICredential";

import { userUpdate } from "../../api/usersWorker";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ProfileBodyModal(props: IUser): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>(props);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  const handleChangeInput =
    (prop: keyof IUser) => (event: ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [prop]: event.target.value });
    };
  function handleChangeSelect(event: SelectChangeEvent) {
    setUser({ ...user, role: event.target.value as tRole });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      props.email === user.email &&
      props.name === user.name &&
      props.role === user.role
    ) {
      return;
    }

    const userSend: IUserUpdate = { id: user.id };
    if (props.email !== user.email) userSend.email = user.email;
    if (props.name !== user.name) userSend.name = user.name;
    if (props.role !== user.role) userSend.role = user.role;

    try {
      userUpdate(userSend);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button onClick={handleOpen}>
        <UpdateIcon />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 400 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap="1rem"
            margin="1rem"
          >
            <TextField
              required
              type="text"
              label="Name"
              value={user.name}
              onChange={handleChangeInput("name")}
            />
            <TextField
              required
              type="email"
              label="Email"
              value={user.email}
              onChange={handleChangeInput("email")}
            />
            <FormControl>
              <InputLabel id="user_role">Role * </InputLabel>
              <Select
                required
                sx={{ p: "0 2.5rem" }}
                id="user_role"
                value={user.role}
                label="Role"
                onChange={handleChangeSelect}
              >
                <MenuItem value="customer">customer</MenuItem>
                <MenuItem value="admin">admin</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="outlined">
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
