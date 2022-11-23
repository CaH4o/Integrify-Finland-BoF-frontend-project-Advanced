import React from "react";

import CartBody from "../component/cart/CartBody";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";

export default function CartPage(): JSX.Element {
  return (
    <div>
      <NavBar />
      <CartBody />
      <Footer />
    </div>
  );
}
