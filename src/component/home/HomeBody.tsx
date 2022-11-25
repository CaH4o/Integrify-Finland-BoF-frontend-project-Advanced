import React from "react";

import { tProduct } from "../../types/tProduct";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function HomeBody() {
  const products: tProduct[] = useAppSelector(
    (state) => state.products.products
  );

  return (
    <div>
      <>
        {!products.length ? (
          <p>HomeBody</p>
        ) : (
          <ul>
            {products.map((p) => {
              return <li key={p.id}>{p.title}</li>;
            })}
          </ul>
        )}
      </>
    </div>
  );
}
