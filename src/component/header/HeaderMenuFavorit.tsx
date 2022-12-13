import { IconButton, Badge } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { IProduct } from "../../types/IProduct";
import { IProductState } from "../../types/IProductState";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  productsToggleFavorite,
  productUpdatePresent,
} from "../../redux/reducers/products";

export default function HeaderMenuFavorit(): JSX.Element {
  const dispatch = useAppDispatch();
  const productState: IProductState = useAppSelector(function (state) {
    return state.products;
  });
  const favoriteNo: number = productState.backUp.reduce(function (
    prev: number,
    product: IProduct
  ) {
    return product.favorite ? ++prev : prev;
  },
  0);
  const favoriteMode: "on" | "off" = productState.filters.favorite;

  function handleToggleFavorit() {
    dispatch(productsToggleFavorite());
    dispatch(productUpdatePresent());
  }

  return (
    <IconButton
      size="large"
      aria-label="show favorites"
      color={favoriteMode === "on" ? "error" : "inherit"}
      onClick={handleToggleFavorit}
    >
      <Badge
        badgeContent={favoriteNo}
        color={favoriteMode === "on" ? "warning" : "info"}
      >
        <FavoriteIcon />
      </Badge>
    </IconButton>
  );
}
