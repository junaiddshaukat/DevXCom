import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage, ActivationPage } from "./Routes.js";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { server } from "./server.js";

const App = () => {
  useEffect(() => {
    axios
      .get(`${server}/user/get-user`,{withCredentials: true}) 
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
      toast.error(err.response?.data?.message || "Failed to fetch user data");
      });
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/activation/:activationToken"
          element={<ActivationPage />}
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
};
export default App;
