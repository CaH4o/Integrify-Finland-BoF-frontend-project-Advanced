import {
  Box,
  Stack,
  Typography,
  ImageListItem,
  ImageList,
} from "@mui/material";

import { IProduct } from "../../types/IProduct";
import { useAppSelector } from "../../hooks/reduxHooks";
import ProductBodyAdminButton from "./ProductBodyAdminButton";

export default function ProductBody(): JSX.Element {
  const product: IProduct = useAppSelector((state) => state.products.single[0]);

  return (
    <div>
      {product ? (
        <Stack spacing={2} alignItems="center" margin="1rem">
          <Typography color="text.secondary" overflow="auto" variant="h3">
            {product.title}
          </Typography>
          <ImageList sx={{ width: "80%" }} cols={3}>
            {product.images.map((item: string) => (
              <ImageListItem key={item}>
                <img
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={product.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Typography variant="h5" color="text.secondary" overflow="auto">
            {product.category.name}
          </Typography>
          <Box>
            <Typography gutterBottom variant="h4" component="div">
              {new Intl.NumberFormat("fi", {
                style: "currency",
                currency: "EUR",
              }).format(product.price)}
            </Typography>
            <Typography variant="body1" color="text.secondary" overflow="auto">
              {product.description}
            </Typography>
          </Box>
              <ProductBodyAdminButton product={product} />
        </Stack>
      ) : (
        <h5>Loading</h5>
      )}
    </div>
  );
}
