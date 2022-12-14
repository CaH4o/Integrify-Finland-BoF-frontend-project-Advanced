import { Grid, Typography } from "@mui/material";

import { IProduct } from "../../types/IProduct";
import { IProductState } from "../../types/IProductState";
import { useAppSelector } from "../../hooks/reduxHooks";
import HomeCard from "./HomeCard";

export default function HomeCardHolder(): JSX.Element {
  const products: IProductState = useAppSelector((state) => state.products);
  const offset: number = (products.page - 1) * 8;
  const presentProducts: IProduct[] = products.present;

  return (
    <>
      {!presentProducts.length ? (
        <Typography variant="body2" color="primary">Sorry. No product found</Typography>
      ) : (
        <Grid container spacing="2rem">
          {presentProducts
            .slice(offset, offset + 8)
            .map((product: IProduct) => {
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
