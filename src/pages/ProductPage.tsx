import React from "react";

import Footer from "../component/Footer";
import Header from "../component/Header";
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
