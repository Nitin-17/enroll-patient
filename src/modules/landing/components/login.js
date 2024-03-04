import { useFormik, FormikHelpers } from "formik";
import loginSchema from "../../../schema/LoginSchema";
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { FaLinkedinIn, FaFacebook } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { login } from "../../../api/auth";
import SignupConfirmationModal from "../../../shared/SignupConfirmationModal";
import { useNavigate } from "react-router-dom";

import { _setLoginInfo } from "../../../helper/localStorageService";
import { encrypt } from "../../../helper/utils";

const timezoneOptions = [
  "Pacific/Honolulu",
  "America/Anchorage",
  "America/Vancouver",
  "America/Boise",
  "America/Matamoros",
  "America/Toronto",
  "Asia/Calcutta",
];

const Login = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalTitle, setModalTitle] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("accessToken");
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      timeZone: "",
      action: "login",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      try {
        //const encryptedPassword = encrypt(values.password);
        let params = {
          emailAddress: values.email,
          password: values.password,
          timeZone: values.timeZone,
          action: "login",
        };

        params = { ...params, password: "4bfdea77319cbcfe35e712f61b2eefaa" };

        console.log("params", params);
        const response = await login(params);
        if (response.success) {
          setMessage(`Login successful: ${response.message}`);
          console.log("response is", response);
          actions.resetForm();
          _setLoginInfo(response);
          localStorage.setItem("accessToken", response.accessToken);
          navigate("/dashboard");
        } else {
          console.log("else part");
          setMessage(`Login failed: ${response.message}`);
        }
      } catch (error) {
        console.log("error-------", error);
        console.error("Error during Login:", error);
        setMessage("Wrong Username or Password ");
        openModal();
        setModalTitle("Wrong Password");
      }
      //actions.resetForm();
    },
  });

  return (
    <div className="flex flex-col max-w-md min-w-lg w-full m-auto mt-10 p-8 rounded-lg border border-gray-300 shadow-lg text-gray-900 bg-slate-50">
      <form onSubmit={handleSubmit} autoComplete="off">
        {/* email */}
        <div className="flex flex-col flex-nowrap mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full mt-2 px-3 py-2 mb-1 text-black rounded border ${
              errors.email && touched.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs mb-2">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col flex-nowrap mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            placeholder="Enter Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full mt-2 px-3 py-2 mb-1 text-black  rounded border ${
              errors.password && touched.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        {/* ----------TimeZone--------------- */}
        <label htmlFor="timeZone">TimeZone</label>
        <select
          id="timeZone"
          name="timeZone" // This should match the field name in your form values
          value={values.timeZone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full mt-1 px-3 py-2 mb-2 text-black rounded border ${
            errors.timeZone && touched.timeZone
              ? "border-red-500"
              : "border-gray-300"
          }`}
        >
          <option value="">Select a timeZone</option>
          {timezoneOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.timeZone && touched.timeZone && (
          <p className="text-red-500 text-xs">{errors.timeZone}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex flex-row items-center mt-2 justify-center p-1 w-full border border-gray-300 rounded bg-gray-700 text-white gap-4 font-normal"
        >
          <BiUser />
          <p>Login</p>
        </button>
      </form>
      {isModalOpen ? (
        <>
          <SignupConfirmationModal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={ModalTitle}
            content={<p>{message}</p>}
          />
        </>
      ) : (
        <h1 className="d-none"></h1>
      )}
    </div>
  );
};

export default Login;
