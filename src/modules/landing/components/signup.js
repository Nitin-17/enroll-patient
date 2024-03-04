import { useFormik } from "formik";
import signupSchema from "../../../schema/signupSchema";
import React, { useState, useEffect } from "react";
import "./signup.css";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn, FaFacebook, FaApple } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { signup } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import SignupConfirmationModal from "../../../shared/SignupConfirmationModal";

import "react-toastify/dist/ReactToastify.css";
//import { getTimeZoneOffset } from '../../../helper/timeZone';

/* const sortOptions = [
    {
        value: 'Pacific/Honolulu',
        label: (
            <div className="signup-time">
                <span>HST</span>
                <label id="hst" htmlFor="hst">
                    Hawaii Standard Time
                </label>
                <span className="right">UTC{getTimeZoneOffset('Pacific/Honolulu')}</span>
            </div>
        ),
        key: 'HST',
    },
    {
        value: 'America/Anchorage',
        label: (
            <div className="signup-time">
                <span>AKST</span>
                <label id="akst" htmlFor="akst">
                    Alaska Standard Time
                </label>
                <span className="right">UTC{getTimeZoneOffset('America/Anchorage')}</span>
            </div>
        ),
        key: 'AKST',
    },
    {
        value: 'America/Vancouver',
        label: (
            <div className="signup-time">
                <span>PST</span>
                <label id="pst" htmlFor="pst">
                    Pacific Standard Time
                </label>
                <span className="right">UTC{getTimeZoneOffset('America/Vancouver')}</span>
            </div>
        ),
        key: 'PST',
    },
    {
        value: 'America/Boise',
        label: (
            <div className="signup-time">
                <span>MST</span>
                <label id="mst" htmlFor="mst">
                    Mountain Standard Time
                </label>
                <span className="right">UTC{getTimeZoneOffset('America/Boise')}</span>
            </div>
        ),
        key: 'MST',
    },
    {
        value: 'America/Matamoros',
        label: (
            <div className="signup-time">
                <span>CST</span>
                <label id="cst" htmlFor="cst">
                    Central Standard Time
                </label>
                <span className="right">UTC{getTimeZoneOffset('America/Matamoros')}</span>
            </div>
        ),
        key: 'CST',
    },
    {
        value: 'America/Toronto',
        label: (
            <div className="signup-time">
                <span>EST</span>
                <label id="est" htmlFor="est">
                    Eastern Standard Time
                </label>
                <span className="right">UTC{getTimeZoneOffset('America/Toronto')}</span>
            </div>
        ),
        key: 'EST',
    },
]; */

const timezoneOptions = [
  "Pacific/Honolulu",
  "America/Anchorage",
  "America/Vancouver",
  "America/Boise",
  "America/Matamoros",
  "America/Toronto",
];

const SignUp = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  //const [isResponse, setIsResponse] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
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

  const googleAuth = () => {
    console.log("Google Auth");
    console.log(apiResponse);
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      timeZone: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values, actions) => {
      try {
        const filteredValues = {
          name: values.firstName + values.lastName,
          emailAddress: values.email,
          password: values.password,
          timeZone: values.timeZone,
        };
        actions.setSubmitting(true);
        const response = await signup(filteredValues);
        setApiResponse(response);
        console.log("API response", response);

        if (response.success) {
          setMessage(response.message);
          setModalTitle("Successfull");
          //setIsResponse(true);
          actions.resetForm();
          openModal();
          //navigate('/login');
        } else {
          //setMessage(`Registration failed: ${response.message}`);
          setMessage(response.error);
          setMessage(response.message);
          openModal();
        }
      } catch (error) {
        console.log("error-----------------------", error);
        setModalTitle("Failed");
        setMessage("Internal Server Error");
        openModal();
      }
      //actions.resetForm();
    },
  });

  return (
    <div className="flex flex-col w-fit max-w-md m-auto mt-10 p-8 rounded-lg border border-gray-300 shadow-lg text-gray-900 bg-slate-50">
      <form onSubmit={handleSubmit} autoComplete="off">
        {/* First Name */}
        <div className="flex flex-row gap-2 flex-nowrap mb-4">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="firstName"
              placeholder="First Name"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full mt-1 px-3 py-2 mb-1 text-black rounded border ${
                errors.firstName && touched.firstName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.firstName && touched.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="lastName"
              placeholder="Last Name"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full mt-1 px-2 py-2 text-black rounded border ${
                errors.lastName && touched.lastName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.lastName && touched.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>
        </div>
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
            className={`w-full mt-1 px-3 py-2 text-black rounded border ${
              errors.email && touched.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col flex-nowrap mb-4">
          {/* Password */}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full mt-1 px-3 py-2 text-black  rounded border ${
              errors.password && touched.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>
        {/* Confirm Password */}
        <div className="flex flex-col flex-nowrap mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Enter confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            onPaste={(e) => {
              e.preventDefault();
              return false;
            }}
            onBlur={handleBlur}
            className={`w-full mt-1 px-3 py-2 text-black  rounded border ${
              errors.confirmPassword && touched.confirmPassword
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}
        </div>
        {/* ----------- Time Zone --------------------- */}

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

        <div className="flex flex-row gap-4 items-center justify-start">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-20 mt-5 p-2 disabled:opacity-25 rounded-md border-solid border-slate-800 bg-slate-500 text-white flex flex-col items-center"
          >
            SignUp
          </button>

          <NavLink to={"/login"}>
            <p className="text-blue-500 font-medium mt-4">
              Already have an Account?
            </p>
          </NavLink>
        </div>

        <div className="flex flex-row items-center space-x-2 my-2">
          <div className="w-full h-0.5 bg-slate-400"></div>
          <p className="text-slate-700">OR</p>
          <div className="w-full h-0.5 bg-slate-400"></div>
        </div>
      </form>

      <div className="flex flex-row gap-1">
        <button className="flex flex-row items-center mt-2 justify-center p-2 w-full border border-gray-300 rounded text-black gap-4 font-normal">
          <FcGoogle size={24} onClick={googleAuth} />
        </button>

        <button className="flex flex-row items-center mt-2 justify-center p-2 w-full border border-gray-300 rounded text-white gap-4 font-normal">
          <FaLinkedinIn color="#0072b1" size={24} />
        </button>

        <button className="flex flex-row items-center mt-2 justify-center p-2 w-full border border-gray-300 rounded text-white gap-4 font-normal">
          <FaFacebook color="#3b5998" size={24} />
        </button>
        <button className="flex flex-row items-center mt-2 justify-center p-2 w-full border border-gray-300 rounded text-white gap-4 font-normal">
          <FaApple color="#A2AAAD" size={24} />
        </button>
      </div>

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

export default SignUp;
