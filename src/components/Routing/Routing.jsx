import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "../Home/Homepage";
import Productspage from "../Products/ProductsPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import CartPage from "../Cart/CartPage";
import MyOrder from "../MyOrder/MyOrder";
import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import Logout from "./../Authentication/Logout";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<Productspage />} />
      <Route path="/product/:productId" element={<SingleProductPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/myorders" element={<MyOrder />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
};

export default Routing;
