import HomeCardHolder from "./HomeCardHolder";
import HomePagination from "./HomePagination";

export default function HomeBody(): JSX.Element {
  return (
    <div>
      <HomePagination />
      <HomeCardHolder />
      <HomePagination />
    </div>
  );
}
