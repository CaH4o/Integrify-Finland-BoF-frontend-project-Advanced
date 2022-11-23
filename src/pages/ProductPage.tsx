import React from "react";

import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
import ProductBody from "../component/product/ProductBody";

export default function ProductPage(): JSX.Element {
  return (
    <div>
      <NavBar />
      <ProductBody />
      <Footer />
    </div>
  );
}
