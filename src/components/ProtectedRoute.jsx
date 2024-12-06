import useAuthContext from "@/hooks/useContext";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
