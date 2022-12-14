import HomeAsideSearch from "./HomeAsideSearch";
import HomeAsideSelectedCataroty from "./HomeAsideSelectedCataroty";
import HomeAsideSortCategory from "./HomeAsideSortCategory";
import HomeAsideSortPrice from "./HomeAsideSortPrice";
import HomeAsideResetButton from "./HomeAsideResetButton";

export default function HomeAside(): JSX.Element {
  return (
    <>
      <HomeAsideSearch />
      <HomeAsideResetButton />
      <HomeAsideSortPrice />
      <HomeAsideSortCategory />
      <HomeAsideSelectedCataroty />
    </>
  );
}
