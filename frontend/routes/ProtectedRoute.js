import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {


    if(!isAuthenticated){
  return  <Navigate to="/login"  replace/>;

    }
        return children
};

export default ProtectedRoute;
