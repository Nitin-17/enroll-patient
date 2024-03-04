import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../modules/landing/components/login";
import SignUp from "../modules/landing/components/signup";
import Dashboard from "../modules/dashboard/dashboard";
import PrivateRoute from "./PrivateRoute";
import { isLogin } from "../helper/utils";

const AppRoutes = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = isLogin();
    if (!isAuthenticated) {
      navigate("/login");
      return null;
    } else {
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute
            //{...defaultProtectedRouteProps}
            outlet={<Dashboard />}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
