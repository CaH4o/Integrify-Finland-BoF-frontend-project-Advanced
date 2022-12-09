import {
  Box,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

import { ICategoryState } from "../../types/ICategoty";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  productsSelectCategories,
  productUpdatePresent,
} from "../../redux/reducers/products";

export default function HomeAsideSelectedCataroty(): JSX.Element {
  const dispatch = useAppDispatch();
  const categories: ICategoryState[] = useAppSelector(function (state) {
    return state.products.filters.categories;
  });

  function handleChange(id: number) {
    dispatch(productsSelectCategories(id));
    dispatch(productUpdatePresent());
  }

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Categories</FormLabel>
        <FormGroup>
          {categories.map(function (c: ICategoryState) {
            return (
              <FormControlLabel
                key={c.name}
                control={
                  <Checkbox
                    checked={c.checked}
                    onChange={() => handleChange(c.id)}
                    color="default"
                  />
                }
                label={<Typography color="primary">{c.name}</Typography>}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </Box>
  );
}
