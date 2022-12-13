import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { IPProductBodyModal } from "../../types/props/IPProductBodyModal";
import {
  IProduct,
  IProductClear,
  IProductCreate,
  IProductUpdate,
} from "../../types/IProduct";
import { ICategory } from "../../types/ICategoty";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  initProduct,
  productsPost,
  productsPut,
} from "../../api/productsWorker";

export default function ProductBodyModalForm(
  props: IPProductBodyModal
): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories: ICategory[] = useAppSelector(function (state) {
    return state.products.categories;
  });
  const productState: IProduct = useAppSelector(
    (state) => state.products.single
  );
  const productInit: IProductClear =
    props.option === "create"
      ? initProduct()
      : { ...JSON.parse(JSON.stringify(productState)) };

  const [product, setProduct] = useState<IProductClear>(productInit);
  const [image, setImage] = useState<string>("");

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
    const p: IProductClear = product;
    p.images.push(image);
    setProduct({ ...p });
    setImage("");
  }
  function deleteImages(index: number) {
    const p: IProductClear = product;
    p.images.splice(index, 1);
    setProduct({ ...p });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (props.option === "create") {
      const p: IProductCreate = {
        ...product,
        categoryId: product.category.id,
      };

      dispatch(productsPost(p));
      navigate("..");
      props.handleClose!();
    } else {
      const p: IProductUpdate = {
        id: product.id,
      };

      if (product.title !== productState.title) {
        p.title = product.title;
      }
      if (product.description !== productState.description) {
        p.description = product.description;
      }
      if (product.price !== productState.price) {
        p.price = product.price;
      }
      if (product.category.id !== productState.category.id) {
        p.category = product.category;
        p.categoryId = product.category.id;
      }
      {
        let isImage: boolean = false;
        for (let i = 0; i < productState.images.length; ++i) {
          isImage = !product.images.some(function (elem) {
            return elem === productState.images[i];
          });

          if (isImage) break;

          const countPrev: number = productState.images.reduce(function (
            prev: number,
            curr: string
          ) {
            return curr === productState.images[i] ? prev + 1 : prev;
          },
          0);
          const countCurr: number = product.images.reduce(function (
            prev: number,
            curr: string
          ) {
            return curr === productState.images[i] ? prev + 1 : prev;
          },
          0);

          if (countPrev !== countCurr) {
            isImage = true;
            break;
          }
        }

        if (isImage) {
          p.images = product.images;
        }
      }

      console.log(p);
      dispatch(productsPut(p));
      props.handleClose!();
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
          <Box display="flex" gap="0.5rem" key={i}>
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
        type="submit"
        variant="outlined"
        color={props.option === "create" ? "success" : "info"}
      >
        {props.option === "create" ? "Create" : "Update"}
      </Button>
    </Box>
  );
}
