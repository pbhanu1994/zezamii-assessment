import { createBrowserRouter } from "react-router-dom";
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
]);

export default router;
