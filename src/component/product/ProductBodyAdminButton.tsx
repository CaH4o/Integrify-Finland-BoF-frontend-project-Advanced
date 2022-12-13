import { Box, Button } from "@mui/material";

import { tRight } from "../../types/ICredential";
import { IProduct } from "../../types/IProduct";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { productsDelete } from "../../api/productsWorker";
import { useNavigate } from "react-router-dom";
import ProductBodyModal from "./ProductBodyModal";

export default function ProjectBodyAdminButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const product: IProduct = useAppSelector((state) => state.products.single);
  const rights: tRight = useAppSelector((state) => state.credential.rights);

  function hendleDelete() {
    dispatch(productsDelete(product.id));
    navigate("..");
  }

  return (
    <Box display="flex" gap="1rem">
      <Box sx={{ display: rights.products.create ? "block" : "none" }}>
        <ProductBodyModal option="create" />
      </Box>
      <Box sx={{ display: rights.products.update ? "block" : "none" }}>
        <ProductBodyModal option="update" />
      </Box>
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
