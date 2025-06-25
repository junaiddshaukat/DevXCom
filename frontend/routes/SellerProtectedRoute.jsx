import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux";

const SellerProtectedRoute = ({ children }) => {
  const { isSeller, seller, loading, error } = useSelector((state) => state.seller);
  
  // console.log("🛡️ SellerProtectedRoute - Full Debug:");
  // console.log("   isSeller:", isSeller, "(type:", typeof isSeller, ")");
  // console.log("   seller:", seller ? `exists (id: ${seller._id})` : "null");
  // console.log("   loading:", loading);
  // console.log("   error:", error);
  // console.log("   cookies:", document.cookie);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Only redirect if we're not loading and seller is not authenticated
  if (!loading && !isSeller) {
    console.log("🚫 Redirecting - no seller authentication");
    return <Navigate to="/shop-login" replace />;
  }

  return children;
};

export default SellerProtectedRoute;