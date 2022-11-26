import React from "react";

import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
import ProductBody from "../component/product/ProductBody";

export default function ProductPage(): JSX.Element {
  return (
    <div>
      <Header />
      <ProductBody />
      <Footer />
    </div>
  );
}
