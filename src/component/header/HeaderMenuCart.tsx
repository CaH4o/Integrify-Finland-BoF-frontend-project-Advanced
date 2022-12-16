import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { ICartState } from "../../types/ICartState";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { cartUpdateNoProducts } from "../../redux/reducers/cart";
import { ICredentialState } from "../../types/ICredentialState";

export default function HeaderMenuCart(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const carts: ICartState = useAppSelector(function (state) {
    return state.cart;
  });
  const user: ICredentialState = useAppSelector(function (state) {
    return state.credential;
  });

  useEffect(
    function () {
      dispatch(cartUpdateNoProducts(user.user?.email || ""));
    },
    [carts, user]
  );

  function handleClick() {
    navigate("/cart");
  }

  return (
    <IconButton
      size="large"
      aria-label="show catrs items"
      color="inherit"
      onClick={handleClick}
    >
      <Badge badgeContent={carts.noProducts} color="info">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}
