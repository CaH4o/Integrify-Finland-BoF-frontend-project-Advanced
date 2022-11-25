import React from "react";

import Footer from "../component/Footer";
import Header from "../component/Header";
import ProfileBody from "../component/profiel/ProfileBody";

export default function ProfilePage(): JSX.Element {
  return (
    <div>
      <Header />
      <ProfileBody />
      <Footer />
    </div>
  );
}
