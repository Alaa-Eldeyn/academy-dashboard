import { Navigate } from "react-router-dom";
import { getUser } from "./utils/LocalStorage";

const ProtectedRoute = ({ children }) => {
  const token = getUser();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
