import { Box, LinearProgress } from "@mui/material";

import { useAppSelector } from "../../hooks/reduxHooks";

export default function HomeLinearProgress() {
  const loading: boolean = useAppSelector((state) => state.products.loading);

  return (
    <Box height="0.2rem" position="relative" bottom="0.5rem">
      {loading && <LinearProgress sx={{height:10}}  color="primary" />}
    </Box>
  );
}
