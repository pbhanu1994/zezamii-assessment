import { createBrowserRouter, Navigate } from "react-router-dom";
import { PAGE_PATH } from "./constants/navigationConstants";
import Home from "./components/Home";
import Products from "./components/Products/Products";

const router = createBrowserRouter([
  {
    path: PAGE_PATH.HOME,
    element: <Home />,
  },
  {
    path: PAGE_PATH.PRODUCTS,
    element: <Products />,
  },
  {
    path: "*",
    element: <Navigate to={PAGE_PATH.HOME} />,
  },
]);

export default router;
