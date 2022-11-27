import HomeCardHolder from "./HomeCardHolder";
import HomeSortByPrice from "./HomeSortByPrice";

export default function HomeBody(): JSX.Element {
  return (
    <div>
      <HomeSortByPrice />
      <HomeCardHolder />
    </div>
  );
}
