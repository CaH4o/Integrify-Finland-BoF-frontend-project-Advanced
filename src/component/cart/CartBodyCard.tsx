import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { IUserProduct, IProductCart } from "../../types/ICartState";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { cartProductAdd, cartProductRemove } from "../../redux/reducers/cart";

export default function CartBodyCard(userProduct: IUserProduct): JSX.Element {
  const dispatch = useAppDispatch();
  const product: IProductCart = userProduct.product;

  return (
    <Card sx={{ display: "flex", m: "1rem", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {product.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {product.category.name}
          </Typography>
          <Typography variant="h6" component="div">
            {new Intl.NumberFormat("fi", {
              style: "currency",
              currency: "EUR",
            }).format(product.price)}
          </Typography>
          <Typography component="div" variant="body2">
            {product.description}
          </Typography>
        </CardContent>
      </Box>

      {product.images.map(function (image: string, index: number) {
        return (
          <CardMedia
            key={index}
            component="img"
            sx={{ width: 151, margin: "0.5rem" }}
            image={image}
            alt={product.title + ". Description:" + product.description}
          />
        );
      })}

      <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
        <Box display="flex" gap="1" justifyContent="center">
          <Button
            onClick={(e) => {
              dispatch(cartProductAdd(userProduct));
            }}
          >
            <AddIcon />
          </Button>
          <Typography sx={{ fontSize: "25px" }} component="div" variant="body1">
            {product.count}
          </Typography>
          <Button
            onClick={(e) => {
              dispatch(cartProductRemove(userProduct));
            }}
          >
            <RemoveIcon />
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
