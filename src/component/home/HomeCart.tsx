import * as React from "react";
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

import { tProduct } from "../../types/tProduct";

export default function HomeCart({
  product,
}: {
  product: tProduct;
}): JSX.Element {
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
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.price}
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
        <Button size="large">Add to busket</Button>
        <Button size="large">Discription</Button>
      </CardActions>
    </Card>
  );
}
