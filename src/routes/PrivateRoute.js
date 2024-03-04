import { Navigate } from "react-router";

export default function PrivateRoute({
  isAuthenticated,
  authenticationPath,
  element,
}) {
  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
