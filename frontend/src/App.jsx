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
  ProductDetailsPage,
  ProfilePage
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import ProtectedRoute from "../routes/ProtectedRoute.jsx";
import Store from "./redux/store.js";
import { loadSeller, loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";
import ShopCreatePage from "./pages/ShopCreatePage.jsx";

import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopPreviewPage
} from "./ShopRoutes.js";
import SellerProtectedRoute from "../routes/SellerProtectedRoute.jsx";
import { getAllProducts } from "./redux/actions/product.js";
import { getAllEvents } from "./redux/actions/event.js";

const App = () => {
  const { loading } = useSelector((state) => state.user);
  const { isSeller, seller } = useSelector((state) => state.seller);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents())
  }, []);

  // console.log("this",isSeller, seller);

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
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />

        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />

         <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

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
        <Route
          path="/dashboard-products"
          element={
            <>
              <SellerProtectedRoute>
                <ShopAllProducts />
              </SellerProtectedRoute>
            </>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <>
              <SellerProtectedRoute>
                <ShopCreateEvents />
              </SellerProtectedRoute>
            </>
          }
        />
        <Route
          path="/dashboard-eventS"
          element={
            <>
              <SellerProtectedRoute>
                <ShopAllEvents />
              </SellerProtectedRoute>
            </>
          }
        />
        <Route
          path="/dashboard-coupons"
          element={
            <>
              <SellerProtectedRoute>
                <ShopAllCoupouns />
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
