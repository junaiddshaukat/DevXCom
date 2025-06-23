import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux";

const SellerProtectedRoute = ({ children }) => {
  const {isSeller } = useSelector((state) => state.seller);

 if (!isSeller) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SellerProtectedRoute;