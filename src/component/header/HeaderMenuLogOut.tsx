import { Button } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { logOut } from "../../redux/reducers/credenital";

export default function HeaderMenuLogOut(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleClick() {
    dispatch(logOut());
    navigate("..");
  }

  return (
    <Button
      size="large"
      variant="outlined"
      color="inherit"
      onClick={handleClick}
      startIcon={<LogoutIcon />}
      sx={{
        border: "none",
        borderRadius: 20,
        textTransform: "none",
        margin: "0.5rem -0.5rem",
      }}
    ></Button>
  );
}
