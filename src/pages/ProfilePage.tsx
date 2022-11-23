import React from "react";

import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
import ProfileBody from "../component/profiel/ProfileBody";

export default function ProfilePage(): JSX.Element {
  return (
    <div>
      <NavBar />
      <ProfileBody />
      <Footer />
    </div>
  );
}
