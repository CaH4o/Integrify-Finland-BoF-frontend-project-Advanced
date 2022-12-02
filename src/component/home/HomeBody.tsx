import HomeCardHolder from "./HomeCardHolder";
import HomePagination from "./HomePagination";
import HomeSortByPrice from "./HomeSortByPrice";

export default function HomeBody(): JSX.Element {
  return (
    <div>
      <HomeSortByPrice />
      <HomePagination />
      <HomeCardHolder />
      <HomePagination />
    </div>
  );
}
