import React from "react";
import { Grid } from "@mui/material";

import { IProduct } from "../../types/IProduct";
import { useAppSelector } from "../../hooks/reduxHooks";
import HomeCard from "./HomeCard";

export default function HomeCardHolder(): JSX.Element {
  const products: IProduct[] = useAppSelector(
    (state) => state.products.products
  );
  return (
    <>
      {!products.length ? (
        <p>loading...</p>
      ) : (
        <Grid container spacing="2rem" >
          {products.map((product: IProduct) => {
            return (
              <Grid
                key={product.id}
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                display="flex"
                justifyContent="center"
              >
                <HomeCard product={product} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
}
