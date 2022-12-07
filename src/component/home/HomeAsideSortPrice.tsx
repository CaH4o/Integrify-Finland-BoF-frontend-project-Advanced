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
import { productsSortByPrice } from "../../redux/reducers/products";

export default function HomeAsideSortPrice(): JSX.Element {
  const dispatch = useAppDispatch();
  const sortDir: tSortDir = useAppSelector(
    (state: RootState) => state.products.sortDir
  );

  function hendelSortByPrice(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.value === sortDir.byPrice) {
      dispatch(productsSortByPrice());
    }
  }

  return (
    <Box component="form" margin="1rem" display="flex" justifyContent="center">
      <RadioGroup row onChange={hendelSortByPrice}>
        <FormControlLabel
          value="asc"
          control={<Radio color="default" />}
          label={<Typography color="primary">First the cheapest</Typography>}
        />
        <FormControlLabel
          value="desc"
          control={<Radio color="default" />}
          label={
            <Typography color="primary">First the most expensive</Typography>
          }
        />
      </RadioGroup>
    </Box>
  );
}
