import { useEffect } from "react";
import { Grid } from "@mui/material";

import { useAppDispatch } from "../hooks/reduxHooks";
import { categoriesGet, productsGet } from "../api/productsWorker";
import Footer from "../component/footer/Footer";
import HomeBody from "../component/home/HomeBody";
import Header from "../component/header/Header";
import HomeAside from "../component/home/HomeAside";
import HomeLinearProgress from "../component/home/HomeLinearProgress";

const style = {
  minWidth: "200px",
  padding: "1rem 0",
  bgcolor: "secondary.main",
};

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(function () {
    dispatch(productsGet(""));
    dispatch(categoriesGet());
  }, []);

  return (
    <>
      <Grid container direction="column"></Grid>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <HomeLinearProgress />
      </Grid>
      <Grid container item xs={12} minHeight="83.5vh">
        <Grid item md={2} sx={style} >
          <HomeAside />
        </Grid>
        <Grid item md={10}>
          <HomeBody />
        </Grid>
      </Grid>
      <Grid item xs={12} >
        <Footer />
      </Grid>
    </>
  );
}
