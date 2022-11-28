import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function HeaderMenuCart(): JSX.Element {
  return (
    <IconButton size="large" aria-label="show catrs items" color="inherit">
      <Badge badgeContent={2} color="info">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}
