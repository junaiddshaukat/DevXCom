import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  SellerActivationPage,
  ShopLoginPage,
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

import Store from "./redux/store.js";
import { loadSeller, loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";
import ShopCreatePage from "./pages/ShopCreatePage.jsx";

import { ShopHomePage, ShopDashboardPage,ShopCreateProduct } from "./ShopRoutes.js";
import SellerProtectedRoute from "../routes/SellerProtectedRoute.jsx";

const App = () => {
  const { loading } = useSelector((state) => state.user);
  const { isSeller, seller } = useSelector((state) => state.seller);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);

  // console.log(isSeller, seller);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/activation/:activationToken"
          element={<ActivationPage />}
        />
        <Route
          path="/seller/activation/:activationToken"
          element={<SellerActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* Shop Routes */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <>
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            </>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <>
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            </>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
};
export default App;
