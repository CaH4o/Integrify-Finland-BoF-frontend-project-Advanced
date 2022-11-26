import React from "react";

import CartBody from "../component/cart/CartBody";
import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";

export default function CartPage(): JSX.Element {
  return (
    <div>
      <Header />
      <CartBody />
      <Footer />
    </div>
  );
}
