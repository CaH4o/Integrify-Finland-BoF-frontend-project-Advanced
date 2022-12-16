import { Stack, Box } from "@mui/material";

import CartBody from "../component/cart/CartBody";
import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";

export default function CartPage(): JSX.Element {
  return (
    <Stack>
      <Box
        margin="80px 0"
        position="relative"
        width="100%"
        minHeight="80vh"
        sx={{ backgroundColor: "background.default" }}
      >
        <CartBody />
      </Box>
      <Box position="fixed" top="0" overflow="hidden" width="100%">
        <Header />
      </Box>
      <Box position="fixed" bottom="0" overflow="hidden" width="100%">
        <Footer />
      </Box>
    </Stack>
  );
}
