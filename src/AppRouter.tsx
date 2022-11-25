import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import ErrorPage from "./pages/ErrorPage";

export default function AppRouter() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/product",
        children: [
          {
            path: "",
            element: <ProductPage />,
          },
          {
            path: ":id",
            element: <CartPage />,
          },
        ],
      },
    ],
    {
      basename: "", //oti_v1
    }
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
