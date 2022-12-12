import { useState } from "react";
import { Box, Modal, Button } from "@mui/material";

import { IPProductBodyModal } from "../../types/props/IPProductBodyModal";
import ProductBodyModalForm from "./ProductBodyModalForm";

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
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  return (
    <>
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
          <ProductBodyModalForm
            option={props.option}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
}
