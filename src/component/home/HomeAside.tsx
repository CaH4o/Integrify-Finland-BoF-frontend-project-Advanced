import { Box } from "@mui/material";

import HomeAsideSearch from "./HomeAsideSearch";
import HomeAsideSelectedCataroty from "./HomeAsideSelectedCataroty";
import HomeAsideSortCategory from "./HomeAsideSortCategory";
import HomeAsideSortPrice from "./HomeAsideSortPrice";

export default function HomeAside(): JSX.Element {
  return (
    <Box>
      <HomeAsideSearch />
      <HomeAsideSortPrice />
      <HomeAsideSortCategory />
      <HomeAsideSelectedCataroty />
    </Box>
  );
}
