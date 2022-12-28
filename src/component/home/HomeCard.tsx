import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { IPHomeCard } from "../../types/props/IPHomeCard";
import { IProduct } from "../../types/IProduct";
import { IProductCart, IUserProduct } from "../../types/ICartState";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  productFavoritAddRemove,
  productUpdatePresent,
} from "../../redux/reducers/products";
import { cartProductAdd } from "../../redux/reducers/cart";

export default function HomeCard(params: IPHomeCard): JSX.Element {
  const dispatch = useAppDispatch();
  const product: IProduct = params.product;
  const userEmail: string =
    useAppSelector(function (state) {
      return state.credential.user?.email;
    }) || "";

  function handleImag(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    src: string[]
  ) {
    const imgSrc: string = e.currentTarget.src;
    let index: number = src.findIndex((src) => src === imgSrc);
    if (index === -1) return;
    e.currentTarget.src = src[++index]
      ? product.images[index]
      : product.images[0];
  }
  function handleFavorit() {
    dispatch(productFavoritAddRemove(product.id));
    dispatch(productUpdatePresent());
  }
  function handleCart() {
    const productCart: IProductCart = { ...product, count: 1 };
    const userProduct: IUserProduct = {
      userEmail,
      product: productCart,
    };
    dispatch(cartProductAdd(userProduct));
  }

  return (
    <Card
      sx={{
        width: 345,
        height: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ height: 320 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#F44336" }} aria-label="recipe">
              {product.category.name[0].toUpperCase()}
            </Avatar>
          }
          title={product.title}
          subheader={product.category.name}
        />
        <CardMedia
          component="img"
          height="140"
          image={product.images[0]}
          alt={product.title}
          onClick={(e) => {
            handleImag(e, product.images);
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {new Intl.NumberFormat("fi", {
              style: "currency",
              currency: "EUR",
            }).format(product.price)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            overflow="auto"
            sx={{ height: 90 }}
          >
            {product.description}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="button" size="small" onClick={handleCart}>
          <ShoppingCartIcon />
        </Button>
        <Link
          to={product.id.toString()}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Button size="small">Discription</Button>
        </Link>
        <Button type="button" size="small" onClick={handleFavorit}>
          {product.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
      </CardActions>
    </Card>
  );
}
