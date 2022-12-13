import { useEffect } from "react";

import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
import ProductBody from "../component/product/ProductBody";
import { useAppDispatch } from "../hooks/reduxHooks";
import { categoriesGet, productsGet } from "../api/productsWorker";
import { useParams } from "react-router-dom";

export default function ProductPage(): JSX.Element {
  const id: string = useParams().id || "";
  const dispatch = useAppDispatch();

  useEffect(
    function () {
      dispatch(productsGet(id));
      dispatch(categoriesGet());
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
