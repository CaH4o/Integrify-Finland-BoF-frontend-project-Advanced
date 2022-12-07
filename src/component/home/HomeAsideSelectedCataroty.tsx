import { useState } from "react";
import {
  Box,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from "@mui/material";

import { IProduct } from "../../types/IProduct";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function HomeAsideSelectedCataroty(): JSX.Element {
  const products: IProduct[] = useAppSelector(function (state) {
    return state.products.present;
  });
  const categories: Set<string> = new Set(
    products.map(function (p: IProduct) {
      return p.category.name;
    })
  );
  const categoriesInitState: {
    name: string;
    checked: boolean;
  }[] = [];

  categories.forEach(function (name: string) {
    categoriesInitState.push({ name, checked: false });
  });

  const [state, setState] = useState(categoriesInitState);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  }

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Categories</FormLabel>
        <FormGroup>
          {state.map(function (c) {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={c.checked}
                    onChange={handleChange}
                    name={c.name}
                  />
                }
                label={c.name}
              />
            );
          })}
          {/* <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={antoine}
                onChange={handleChange}
                name="antoine"
              />
            }
            label="Antoine Llorca"
          /> */}
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
    </Box>
  );
}
