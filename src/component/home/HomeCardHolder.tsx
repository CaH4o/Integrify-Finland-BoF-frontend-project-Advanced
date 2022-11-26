import React from "react";
import { Grid } from "@mui/material";

import { tProduct } from "../../types/tProduct";
import { useAppSelector } from "../../hooks/reduxHooks";
import HomeCart from "./HomeCart";

export default function HomeCardHolder(): JSX.Element {
  const products: tProduct[] = useAppSelector(
    (state) => state.products.products
  );
  return (
    <>
      {!products.length ? (
        <p>loading...</p>
      ) : (
        <Grid container spacing="2rem">
          {products.map((product) => {
            return (
              <Grid
                key={product.id}
                item
                xs={12}
                sm={6}
                md={3}
                display="flex"
                justifyContent="center"
              >
                <HomeCart product={product} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
}
