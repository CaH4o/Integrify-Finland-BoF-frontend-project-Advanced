import { Button, Box } from "@mui/material";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { productReset } from "../../redux/reducers/products";

export default function HomeAsideResetButton(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ width: "80%", color: "default", m: "1rem" }}
        onClick={() => dispatch(productReset())}
      >
        Reset
      </Button>
    </Box>
  );
}
