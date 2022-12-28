import { useState } from "react";
import { Box, MenuItem, Menu, IconButton } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";

import { IUser } from "../../types/IUser";
import { useAppSelector } from "../../hooks/reduxHooks";
import HeaderMenuFavorit from "./HeaderMenuFavorit";
import HeaderMenuCart from "./HeaderMenuCart";
import HeaderMenuLogin from "./HeaderMenuLogin";
import HeaderMenuLogOut from "./HeaderMenuLogOut";

export default function HeaderMenu(): JSX.Element {
  const user: IUser | undefined = useAppSelector(function (state) {
    return state.credential.user;
  });
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }
  function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <HeaderMenuFavorit />
        <p>Favorites</p>
      </MenuItem>
      <MenuItem>
        <HeaderMenuCart />
        <p>In carts</p>
      </MenuItem>
      <MenuItem>
        <HeaderMenuLogin />
      </MenuItem>
      {user && (
        <MenuItem>
          <HeaderMenuLogOut />
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <HeaderMenuFavorit />
        <HeaderMenuCart />
        <HeaderMenuLogin />
        {user && <HeaderMenuLogOut />}
      </Box>

      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
      {renderMobileMenu}
    </div>
  );
}
