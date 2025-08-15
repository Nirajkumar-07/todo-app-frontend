import { Navigate } from "react-router";

function AuthWrapper({ children }) {
  const token = sessionStorage.getItem("auth_token");
  if (token) return children;
  else return <Navigate to={"/signin"} />;
}

export default AuthWrapper;
