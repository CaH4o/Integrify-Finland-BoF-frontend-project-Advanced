import { Button, Box } from "@mui/material";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { productReset } from "../../redux/reducers/products";

export default function HomeAsideResetButton(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Button
        variant="outlined"
        color="info"
        sx={{ width: "50%" }}
        onClick={() => dispatch(productReset())}
      >
        Reset
      </Button>
    </Box>
  );
}
