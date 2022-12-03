import { Pagination, Stack } from "@mui/material";

import { IProductState } from "../../types/IProductState";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { productsSetPage } from "../../redux/reducers/products";

export default function HomePagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const products: IProductState = useAppSelector(function (state) {
    return state.products;
  });
  const page: number = products.page;
  const pages: number = Math.ceil(products.present.length / 8);

  function handleChange(event: React.ChangeEvent<unknown>, value: number) {
    dispatch(productsSetPage(value));
  }

  return (
    <Stack>
      <Pagination
        count={pages}
        page={page}
        boundaryCount={2}
        onChange={handleChange}
        color="primary"
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{ alignSelf: "center", mr: "1rem", p: "1rem" }}
      />
    </Stack>
  );
}
