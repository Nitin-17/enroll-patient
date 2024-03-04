import { Navigate } from "react-router";

export default function PrivateRoute({
  isAuthenticated,
  authenticationPath,
  outlet,
}) {
  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
