import React, { useEffect } from "react";

import Footer from "../component/footer/Footer";
import HomeBody from "../component/home/HomeBody";
import Header from "../component/header/Header";
import { useAppDispatch } from "../hooks/reduxHooks";
import { fetchProducts } from "../redux/reducers/products";

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(function () {
    dispatch(fetchProducts("https://api.escuelajs.co/api/v1/products"));
  }, []);

  return (
    <div>
      <Header />
      <HomeBody />
      <Footer />
    </div>
  );
}
