import React, { useEffect } from "react";

import Footer from "../component/Footer";
import HomeBody from "../component/home/HomeBody";
import NavBar from "../component/NavBar";
import { useAppDispatch } from "../hooks/reduxHooks";
import { fetchProducts } from "../redux/reducers/Products";

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(function () {
    dispatch(fetchProducts("https://api.escuelajs.co/api/v1/products"));
  }, []);

  return (
    <div>
      <NavBar />
      <HomeBody />
      <Footer />
    </div>
  );
}
