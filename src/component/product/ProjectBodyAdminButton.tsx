import { Box, Button } from "@mui/material";

import { tRight } from "../../types/ICredential";
import { IProduct } from "../../types/IProduct";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { productsDelete } from "../../api/productsWorker";
import { useNavigate } from "react-router-dom";

export default function ProjectBodyAdminButton(props: {
  product: IProduct;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const rights: tRight = useAppSelector((state) => state.credential.rights);

  function hendleDelete() {
    dispatch(
      productsDelete(
        `https://api.escuelajs.co/api/v1/products/${props.product.id}`
      )
    );
    navigate("..");
  }

  return (
    <Box display="flex" gap="1rem">
      <Button
        color="success"
        variant="outlined"
        sx={{ display: rights.products.create ? "block" : "none" }}
      >
        Create a new product
      </Button>
      <Button
        color="info"
        variant="outlined"
        sx={{ display: rights.products.update ? "block" : "none" }}
      >
        Update the product
      </Button>
      <Button
        color="warning"
        variant="outlined"
        sx={{ display: rights.products.delete ? "block" : "none" }}
        onClick={hendleDelete}
      >
        Delet the product
      </Button>
    </Box>
  );
}
