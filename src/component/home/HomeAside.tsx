import { Box } from "@mui/material";

import HomeAsideSearch from "./HomeAsideSearch";
import HomeAsideSelectedCataroty from "./HomeAsideSelectedCataroty";
import HomeAsideSortPrice from "./HomeAsideSortPrice";

export default function HomeAside(): JSX.Element {
  return <Box>
    <HomeAsideSearch/>
    <HomeAsideSortPrice/>
    <HomeAsideSelectedCataroty/>
  </Box>;
}
