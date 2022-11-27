import { useEffect } from "react";

import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
import ProductBody from "../component/product/ProductBody";
import { useAppDispatch } from "../hooks/reduxHooks";
import { productsGet } from "../api/apiWorker";
import { useParams } from "react-router-dom";

export default function ProductPage(): JSX.Element {
  const id: string = useParams().id || "";
  const dispatch = useAppDispatch();

  useEffect(
    function () {
      dispatch(productsGet(`https://api.escuelajs.co/api/v1/products/${id}`));
    },
    [id]
  );

  return (
    <div>
      <Header />
      <ProductBody />
      <Footer />
    </div>
  );
}
