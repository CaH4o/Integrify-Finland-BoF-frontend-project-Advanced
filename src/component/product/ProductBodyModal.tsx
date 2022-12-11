import { useState, ChangeEvent } from "react";
import {
  Box,
  Modal,
  Button,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { IPProductBodyModal } from "../../types/props/IPProductBodyModal";
import { IProduct } from "../../types/IProduct";
import { ICategory } from "../../types/ICategoty";
import { useAppSelector } from "../../hooks/reduxHooks";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ProductBodyModal(
  props: IPProductBodyModal
): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const categories: ICategory[] = useAppSelector(function (state) {
    return state.products.categories;
  });
  const [image, setImage] = useState<string>("");
  const productInit: IProduct =
    props.option === "create"
      ? {
          id: 0,
          title: "",
          description: "",
          favorite: false,
          price: 0,
          images: [],
          category: {
            id: 1,
            name: "",
            image: "",
          },
        }
      : JSON.parse(JSON.stringify(props.product!));
  const [product, setProduct] = useState<IProduct>(productInit);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const key: string = event.target.name;
    let value: string | number | ICategory;

    switch (key) {
      case "price":
        value = Number(event.target.value);
        break;
      case "category":
        value = categories.find(function (c: ICategory) {
          return c.id === Number(event.target.value);
        })!;
        break;
      default:
        value = event.target.value;
        break;
    }

    setProduct({ ...product, [key]: value });
  }

  function handleImage(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setImage(event.target.value);
  }
  function addImages() {
    const p: IProduct = product;
    p.images.push(image);
    setProduct({ ...p });
    setImage("");
  }
  function deleteImages(index: number) {
    const p: IProduct = product;
    p.images.splice(index, 1);
    setProduct({ ...p });
  }

  return (
    <div>
      <Button
        color={props.option === "create" ? "success" : "info"}
        variant="outlined"
        onClick={handleOpen}
      >
        {props.option === "create"
          ? "Create a new product"
          : "Update the product"}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 400 }}>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
            <Typography variant="h5">
              {props.option === "create"
                ? "Create a new product"
                : "Update the product"}
            </Typography>
            <TextField
              required
              type="text"
              label="Title"
              variant="outlined"
              name="title"
              value={product.title}
              onChange={handleChange}
              helperText="Please enter product title"
            />
            <TextField
              required
              type="number"
              label="Price"
              variant="outlined"
              name="price"
              value={product.price || ""}
              onChange={handleChange}
              helperText="Please enter product price in euro"
            />
            <TextField
              required
              type="text"
              label="Description"
              variant="outlined"
              name="description"
              value={product.description}
              onChange={handleChange}
              multiline
              rows={3}
              helperText="Please provide product description"
            />
            <TextField
              required
              select
              label="Category"
              variant="outlined"
              name="category"
              value={product.category.id.toString()}
              onChange={handleChange}
              helperText="Please select product category"
            >
              {categories.map((c: ICategory) => (
                <MenuItem key={c.id.toString()} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
            <Box display="flex" gap="0.5rem">
              {product.images.length < 3 && (
                <>
                  <TextField
                    sx={{ width: "100%" }}
                    type="text"
                    label="Add picture"
                    variant="outlined"
                    value={image}
                    onChange={handleImage}
                  />
                  <Button variant="outlined" onClick={addImages}>
                    <AddPhotoAlternateIcon />
                  </Button>
                </>
              )}
            </Box>
            {product.images.map(function (s: string, i: number) {
              return (
                <Box display="flex" gap="0.5rem">
                  <TextField
                    disabled
                    sx={{ width: "100%" }}
                    type="text"
                    label="Added picture url"
                    variant="outlined"
                    value={s}
                  />
                  <a style={{ alignSelf: "center" }} href={s} target="_blanck">
                    <img src={s} alt="product pictues" width="50px" />
                  </a>
                  <Button
                    variant="outlined"
                    onClick={(e) => {
                      deleteImages(i);
                    }}
                  >
                    <ImageNotSupportedIcon />
                  </Button>
                </Box>
              );
            })}
            <Button
              variant="outlined"
              color={props.option === "create" ? "success" : "info"}
            >
              {props.option === "create" ? "Create" : "Update"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
