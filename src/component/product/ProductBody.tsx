import React from "react";

import { useAppSelector } from "../../hooks/reduxHooks";
import { IProduct } from "../../types/IProduct";

export default function ProductBody(): JSX.Element {
  const products: IProduct = useAppSelector(
    (state) => state.products.products[0]
  );

  return (
    <div>
      {products ? (
        <>
          <p>{products.title}</p>
          <p>{products.price}</p>
        </>
      ) : (
        <h5>Loading</h5>
      )}
    </div>
  );
}
