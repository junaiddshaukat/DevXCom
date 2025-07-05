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
  ProfilePage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox
} from "./Routes.js";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
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
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithDrawMoney,
  ShopInboxPage
} from "./ShopRoutes.js";
import SellerProtectedRoute from "../routes/SellerProtectedRoute.jsx";
import { getAllProducts } from "./redux/actions/product.js";
import { getAllEvents } from "./redux/actions/event.js";
import { Elements } from "@stripe/react-stripe-js";
// import {loadStripe} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { server } from "./server.js";

const App = () => {
  const { loading } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApiKey);
  }

  // const { isSeller, seller } = useSelector((state) => state.seller);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApiKey();
  }, []);

  // console.log("this",isSeller, seller);

  // console.log("stripeApiKey", stripeApiKey);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
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

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route path="/order/success" element={<OrderSuccessPage />} />

        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
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
          path="/dashboard-orders"
          element={
            <>
              <SellerProtectedRoute>
                <ShopAllOrders />
              </SellerProtectedRoute>
            </>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <>
              <SellerProtectedRoute>
                <ShopAllRefunds />
              </SellerProtectedRoute>
            </>
          }
        />
        <Route
          path="/dashboard-withdraw-money"
          element={
            <>
              <SellerProtectedRoute>
                <ShopWithDrawMoney />
              </SellerProtectedRoute>
            </>
          }
        />
        <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <ShopInboxPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <>
              <SellerProtectedRoute>
                <ShopOrderDetails />
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
          path="/settings"
          element={
            <>
              <SellerProtectedRoute>
                <ShopSettingsPage />
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
