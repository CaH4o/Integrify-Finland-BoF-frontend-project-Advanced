import { Box, Button, Typography } from "@mui/material";

import { IProductCart } from "../../types/ICartState";

export default function CartBodySummury(props: IProductCart[][]): JSX.Element {
  const products: IProductCart[] = props[0];
  let cnt: number = 0;
  let sum: number = 0;

  for (let i = 0; i < products.length; ++i) {
    cnt += products[i].count;
    sum += products[i].count * products[i].price;
  }

  return (
    <Box
      component="div"
      display="flex"
      gap="1rem"
      justifyContent="center"
      alignItems="center"
      margin="5px 0"
    >
      <Box width="20%"></Box>
      <Box width="20%">
        <Typography
          variant="h5"
          component="div"
          color="primary"
          justifySelf="flex-start"
        >
          {"Total Price: "}
          {new Intl.NumberFormat("fi", {
            style: "currency",
            currency: "EUR",
          }).format(sum)}
        </Typography>
      </Box>
      <Box width="20%">
        <Button variant="contained" size="large" sx={{ padding: "1rem" }}>
          Buy
        </Button>
      </Box>
      <Box width="20%">
        <Typography variant="h5" component="div" color="primary">
          Total items: {cnt.toLocaleString('fi-Fi')}
        </Typography>
      </Box>
      <Box width="20%"></Box>
    </Box>
  );
}
