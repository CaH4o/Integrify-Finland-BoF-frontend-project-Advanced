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

import { IPHomeCard } from "../../types/props/IPHomeCard";
import { IProduct } from "../../types/IProduct";

export default function HomeCard(params: IPHomeCard): JSX.Element {
  const product: IProduct = params.product;

  function imgHendler(
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
            imgHendler(e, product.images);
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
      <CardActions>
        <Button size="large">Add to cart</Button>
        <Link
          to={`product/${product.id}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Button size="large">Discription</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
