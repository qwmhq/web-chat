import { useContext } from "react";
import { AccountContext } from "../reducers/userReducer";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [userState, _] = useContext(AccountContext);

  if (!userState.currentUserLoaded) return null;

  return userState.currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
