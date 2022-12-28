import { useEffect } from "react";
import { Box, Stack } from "@mui/material";

import { useAppDispatch } from "../hooks/reduxHooks";
import { categoriesGet, productsGet } from "../api/productsWorker";
import Footer from "../component/footer/Footer";
import HomeBody from "../component/home/HomeBody";
import Header from "../component/header/Header";
import HomeAside from "../component/home/HomeAside";
import HomeLinearProgress from "../component/home/HomeLinearProgress";

export default function ProductsPage() {
  const dispatch = useAppDispatch();

  useEffect(function () {
    dispatch(productsGet(""));
    dispatch(categoriesGet());
  }, []);

  return (
    <Stack>
      <Box
        margin="80px 0 90px 0"
        position="relative"
        width="100%"
        minHeight="80vh"
        sx={{ backgroundColor: "background.default" }}
        display="flex"
      >
        <Box
          width="15%"
          position="fixed"
          top="80"
          padding="1rem 0"
          bgcolor="secondary.main"
          minHeight="78vh"
        >
          <HomeAside />
        </Box>
        <Box width="85%" marginLeft="15%">
          <HomeBody />
        </Box>
      </Box>
      <Box position="fixed" top="0" overflow="hidden" width="100%">
        <Header />
        <HomeLinearProgress />
      </Box>
      <Box position="fixed" bottom="0" overflow="hidden" width="100%">
        <Footer />
      </Box>
    </Stack>
  );
}
