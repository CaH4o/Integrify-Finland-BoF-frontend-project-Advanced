import React from "react";

import CartBody from "../component/cart/CartBody";
import Footer from "../component/Footer";
import Header from "../component/Header";

export default function CartPage(): JSX.Element {
  return (
    <div>
      <Header />
      <CartBody />
      <Footer />
    </div>
  );
}
