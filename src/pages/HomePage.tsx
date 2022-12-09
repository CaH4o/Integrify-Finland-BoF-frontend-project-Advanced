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
  height: "100",
  minWidth: "200px",
  padding: "1rem 0",
  bgcolor: "secondary.main",
};

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(function () {
    dispatch(productsGet("https://api.escuelajs.co/api/v1/products"));
    dispatch(categoriesGet("https://api.escuelajs.co/api/v1/categories"));
  }, []);

  return (
    <div>
      <Grid container direction="column" spacing={2} sx={{ m: 0 }}></Grid>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <HomeLinearProgress />
      </Grid>
      <Grid container item xs={12}>
        <Grid item md={2} sx={style}>
          <HomeAside />
        </Grid>
        <Grid item md={10}>
          <HomeBody />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </div>
  );
}
