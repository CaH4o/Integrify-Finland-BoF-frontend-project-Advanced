import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
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
            path: "products",
            children: [
              {
                index: true,
                element: <ProductsPage />,
              },

              {
                path: ":id",
                element: <ProductPage />,
              },
            ],
          },
          {
            path: "cart",
            element: <CartPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
    {
      basename: "/bof-frontend-project-advanced",
    }
  );

  return <RouterProvider router={router} />;
}
