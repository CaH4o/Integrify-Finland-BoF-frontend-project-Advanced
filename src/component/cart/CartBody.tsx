import { Box, Typography } from "@mui/material";

import {
  ICart,
  ICartState,
  IProductCart,
  IUserProduct,
} from "../../types/ICartState";
import { useAppSelector } from "../../hooks/reduxHooks";
import CartBodyCard from "./CartBodyCard";
import CartBodySummury from "./CartBodySummury";

export default function CartBody(): JSX.Element {
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
        <Box>
          <Box
            position="fixed"
            top={64}
            width="100%"
            overflow="hidden"
            bgcolor="background.default"
            zIndex={1}
          >
            <CartBodySummury {...[products]} />
            <hr />
          </Box>
          <Box position="static" marginTop="80px">
            {products.map(function (product: IProductCart) {
              const userProduct: IUserProduct = {
                userEmail,
                product,
              };
              return <CartBodyCard key={product.id} {...userProduct} />;
            })}
          </Box>
        </Box>
      ) : (
        <Typography variant="body1" fontSize={32}>
          {"No products are added in cart"}
        </Typography>
      )}
    </>
  );
}
