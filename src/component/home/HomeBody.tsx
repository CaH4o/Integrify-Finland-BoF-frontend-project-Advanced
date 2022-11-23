import React from "react";

import { tProduct } from "../../types/tProduct";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function HomeBody() {
  const products: tProduct[] = useAppSelector((state) => state.products.products);

  return (
    <div>
      <>
        {!products.length ? (
          <p>HomeBody</p>
        ) : (
          products.map((p) => {
            return <p>{p.title}</p>;
          })
        )}
      </>
    </div>
  );
}
