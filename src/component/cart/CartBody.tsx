import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { ICart, ICartState, IProductCart } from "../../types/ICartState";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { cartProductAdd, cartProductRemove } from "../../redux/reducers/cart";

export default function CartBody(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const userEmail: string =
    useAppSelector(function (state) {
      return state.credential.user?.email;
    }) || "";
  const cartState: ICartState = useAppSelector(function (state) {
    return state.cart;
  });
  const userIndex: number = cartState.carts.findIndex(function (c: ICart) {
    return c.userEmail === userEmail;
  });
  const products: IProductCart[] =
    userIndex === -1 ? [] : cartState.carts[userIndex].product;

  return (
    <>
      {products.length ? (
        products.map(function (product: IProductCart) {
          return (
            <Card
              key={product.id}
              sx={{ display: "flex", m: "1rem", justifyContent: "center" }}
            >
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
                      dispatch(
                        cartProductAdd({
                          userEmail,
                          product: [{ ...product, count: 1 }],
                        })
                      );
                    }}
                  >
                    <AddIcon />
                  </Button>
                  <Typography
                    sx={{ fontSize: "25px" }}
                    component="div"
                    variant="body1"
                  >
                    {product.count}
                  </Typography>
                  <Button
                    onClick={(e) => {
                      dispatch(
                        cartProductRemove({
                          userEmail,
                          product: [{ ...product, count: 1 }],
                        })
                      );
                    }}
                  >
                    <RemoveIcon />
                  </Button>
                </Box>
              </Box>
            </Card>
          );
        })
      ) : (
        <p>{"No products"}</p>
      )}
    </>
  );
}
