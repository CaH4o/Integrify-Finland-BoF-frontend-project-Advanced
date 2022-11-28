import { IconButton, Badge } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function HeaderMenuFavorit(): JSX.Element {
  return (
    <IconButton size="large" aria-label="show favorites" color="inherit">
      <Badge badgeContent={7} color="info">
        <FavoriteIcon />
      </Badge>
    </IconButton>
  );
}
