import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "../hooks/reduxHooks";
import { categoriesGet, productsGet } from "../api/productsWorker";
import Header from "../component/header/Header";
import ProductBody from "../component/product/ProductBody";
import Footer from "../component/footer/Footer";
import { Box, Stack } from "@mui/material";

export default function ProductPage(): JSX.Element {
  const id: string = useParams().id || "";
  const dispatch = useAppDispatch();

  useEffect(
    function () {
      dispatch(productsGet(id));
      dispatch(categoriesGet());
    },
    [id]
  );

  return (
    <Stack >
      <Box
        margin="80px 0"
        position="relative"
        width="100%"
        minHeight="80vh"
        sx={{ backgroundColor: "background.default" }}
      >
        <ProductBody />
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
