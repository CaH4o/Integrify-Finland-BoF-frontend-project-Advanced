import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, Avatar } from "@mui/material/";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { IUser } from "../../types/IUser";
import { useAppSelector } from "../../hooks/reduxHooks";
import HeaderMenuLoginForm from "./HeaderMenuLoginForm";

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
};

export default function HeaderMenuLogin() {
  const navigate = useNavigate();
  const user: IUser | undefined = useAppSelector(function (state) {
    return state.credential.user;
  });
  const [openModule, setOpenModule] = useState(false);

  function handleOpen() {
    user ? navigate("/profile") : setOpenModule(true);
  }
  function handleClose() {
    setOpenModule(false);
  }

  return (
    <div>
      <Button
        size="large"
        variant="outlined"
        color="inherit"
        onClick={handleOpen}
        startIcon={
          user ? (
            <Avatar
              alt={user.name}
              src={user?.avatar}
              sx={{ width: 32, height: 32 }}
            />
          ) : (
            <AccountCircle sx={{ width: 32, height: 32 }} />
          )
        }
        sx={{
          border: "none",
          borderRadius: 20,
          textTransform: "none",
          margin: "0.5rem",
        }}
      >
        {user ? user.name : "Login"}
      </Button>
      <Modal
        open={openModule}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <HeaderMenuLoginForm handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
