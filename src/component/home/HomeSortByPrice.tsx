import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";
import { ISortDir } from "../../types/IProductState";
import { productsSortByPrice } from "../../redux/reducers/products";

export default function HomeSortByPrice() {
  const dispatch = useAppDispatch();
  const sortDir: ISortDir = useAppSelector(
    (state: RootState) => state.products.sortDir
  );

  function hendelSortByPrice(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.value === sortDir.byPrice) {
      dispatch(productsSortByPrice());
    }
  }

  return (
    <FormControl>
      <RadioGroup row onChange={hendelSortByPrice}  >
        <FormControlLabel
          value="asc"
          control={<Radio color="default" />}
          label="First the cheapest"
        />
        <FormControlLabel
          value="desc"
          control={<Radio color="default"/>}
          label="First the most expensive"
        />
      </RadioGroup>
    </FormControl>
  );
}
