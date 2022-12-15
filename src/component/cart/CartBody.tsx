import { Box, Button, Typography } from "@mui/material";

import { ICart, ICartState, IProductCart } from "../../types/ICartState";
import { ICredential } from "../../types/ICredential";
import { getLocalCredential } from "../../api/credenitalWorker";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { cartProductAdd, cartProductRemove } from "../../redux/reducers/cart";

export default function CartBody(): JSX.Element {
  const dispatch = useAppDispatch();
  const userCredential: ICredential = getLocalCredential();
  const cartState: ICartState = useAppSelector(function (state) {
    return state.cart;
  });
  const userIndex: number = cartState.carts.findIndex(function (c: ICart) {
    return c.user.access_token === userCredential.access_token;
  });
  const products: IProductCart[] =
    userIndex === -1 ? [] : cartState.carts[userIndex].product;

  return (
    <div>
      {products.length ? (
        products.map(function (product: IProductCart) {
          return (
            <>
              <p>{product.title}</p>
              <p>{product.price}</p>
              <p>{product.category.name}</p>
              <p>{product.description}</p>
              <Box display="flex" gap="1" justifyContent="center">
                <Button
                  onClick={(e) => {
                    dispatch(cartProductAdd(product));
                  }}
                >
                  +
                </Button>
                <Typography>{product.count}</Typography>
                <Button
                  onClick={(e) => {
                    dispatch(cartProductRemove(product.id));
                  }}
                >
                  -
                </Button>
              </Box>
            </>
          );
        })
      ) : (
        <p>{"No products"}</p>
      )}
    </div>
  );
}
