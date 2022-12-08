import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material/";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { tSortDir } from "../../types/IProductState";
import { productsSortByCategories } from "../../redux/reducers/products";

export default function HomeAsideSortPrice(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortDir: tSortDir = useAppSelector(
    (state: RootState) => state.products.sortDir
  );

  function hendelSortByPrice(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.value === sortDir.byCategories) {
      dispatch(productsSortByCategories());
    }
  }

  return (
    <Box component="form" margin="1rem">
      <RadioGroup
        row
        onChange={hendelSortByPrice}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <FormControlLabel
          value="asc"
          control={<Radio color="default" />}
          label={<Typography color="primary">From A to Z</Typography>}
        />
        <FormControlLabel
          value="desc"
          control={<Radio color="default" />}
          label={<Typography color="primary">From Z to A</Typography>}
        />
      </RadioGroup>
    </Box>
  );
}
