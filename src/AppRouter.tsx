import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import ErrorPage from "./pages/ErrorPage";

export default function AppRouter(): JSX.Element {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "product/:id",
            element: <ProductPage />,
          },
        ],
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
    {
      basename: "/bof-frontend-project-advanced",
    }
  );

  return <RouterProvider router={router} />;
}
