import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";

import MainPage from "./components/main/MainPage"
import ProductExclusive from "./components/products/ProductExclusive";
import Error from "./components/error/Error"


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    
  },

  {
    path:"/products/:idProduct",
    element: <ProductExclusive />,
  },

  {
    path:"*",
    element:<Error />
  }

]);

const App = () => {
  return (
    <div>
     
      <RouterProvider router={router} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
