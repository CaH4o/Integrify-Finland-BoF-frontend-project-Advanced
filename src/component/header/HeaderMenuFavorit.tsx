import { IconButton, Badge } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { IProduct } from "../../types/IProduct";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function HeaderMenuFavorit(): JSX.Element {
  const favNo: number = useAppSelector(function (state) {
    return state.products.backUp;
  }).reduce(function (prev: number, product: IProduct) {
    return product.favorite ? ++prev : prev;
  }, 0);

  return (
    <IconButton size="large" aria-label="show favorites" color="inherit">
      <Badge badgeContent={favNo} color="info">
        <FavoriteIcon />
      </Badge>
    </IconButton>
  );
}
