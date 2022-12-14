import {
  Box,
  Stack,
  Typography,
  ImageListItem,
  ImageList,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { IProduct } from "../../types/IProduct";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { productFavoritAddRemove } from "../../redux/reducers/products";
import ProductBodyAdminButton from "./ProductBodyAdminButton";

export default function ProductBody(): JSX.Element {
  const dispatch = useAppDispatch();
  const product: IProduct = useAppSelector((state) => state.products.single);

  function handleFavorit() {
    dispatch(productFavoritAddRemove(product.id));
  }

  return (
    <div>
      {product ? (
        <Stack spacing={2} alignItems="center" margin="1rem">
          <Typography color="text.secondary" overflow="auto" variant="h3">
            {product.title}
            <Button type="button" size="large" onClick={handleFavorit}>
              {product.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
          </Typography>
          <ImageList sx={{ width: "80%" }} cols={3}>
            {product.images.map((item: string, index: number) => (
              <ImageListItem key={index}>
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
            <Typography gutterBottom variant="h4" color="text.secondary" component="div">
              {new Intl.NumberFormat("fi", {
                style: "currency",
                currency: "EUR",
              }).format(product.price)}
            </Typography>
            <Typography variant="body1" color="text.secondary" overflow="auto">
              {product.description}
            </Typography>
          </Box>
          <ProductBodyAdminButton />
        </Stack>
      ) : (
        <h5>Loading</h5>
      )}
    </div>
  );
}
