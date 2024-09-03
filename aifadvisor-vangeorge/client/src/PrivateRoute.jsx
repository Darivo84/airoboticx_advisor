import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Replace with your auth logic

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;