import React, { useEffect, useState } from "react";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import {
  autoFormatPhoneNumber,
  phoneRegExp,
  formatDate,
} from "../helper/utils.js";
import moment from "moment/moment.js";
import "../css/IcdCodes.css";
import { useDispatch, useSelector } from "react-redux";
import { addPatientDetails } from "../store/reducers/enrollPatientReducer.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import IcdDropdown from "../modules/icdDropdown/IcdDropdown.js";

const validationSchema = Yup.object()
  .shape({
    firstName: Yup.string()
      .required("First Name is required")
      .matches(/^[a-z0-9 .'-]+$/i, "First Name is not valid")
      .min(3, "First Name should have at least 3 characters")
      .max(50, "First Name should not exceed 50 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/^[a-z0-9 .'-]+$/i, "Last Name is not valid"),
    dob: Yup.string().nullable().required("Enter dob"),
    patientEmail: Yup.string().email("Enter a valid Patient Email"),
    consent: Yup.string().required("Enter select consent"),
    mobilePhone: Yup.string()
      .required("Phone number is required")
      .min(10, "Mobile Phone should have at least 10 digit")
      .max(10, "Mobile Phone should not exceed 10 digit"),
    homePhone: Yup.string()
      .min(10, "Home Phone should have at least 10 digit")
      .max(10, "Home Phone should not exceed 10 digit"),
    patientMRN: Yup.string()
      .optional()
      .required("Patient MRN")
      .matches(/^[a-zA-Z0-9 ]+$/, "MRN is not valid")
      .min(3, "MRN should have at least 3 characters")
      .max(50, "MRN should not exceed 50 characters"),
    gender: Yup.string().required("Select a Gender"),
    countryCode: Yup.string().required("Select country code"),
    /*  language: Yup.string().when("language", {
    is: (val) => val === "other",
    then: Yup.string()
      .required("Other Language")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .min(3, "Other Language should have at least 3 characters")
      .max(30, "Other Language should not exceed 30 characters"),
    otherwise: Yup.string().notRequired(),
  }), */
    language: Yup.string().required("Select language"),
    icdCodes: Yup.array().required("ICD-10 Code is required"),
    contactVia: Yup.lazy((value) => {
      if (value && value.consent === "yes") {
        return Yup.object()
          .shape({
            email: Yup.boolean(),
            phone: Yup.boolean(),
          })
          .test(
            "at-least-one",
            "Please select at least one contact option",
            (value) => value.email || value.phone
          );
      }
      return Yup.object().notRequired();
    }),
  })
  .test("myCustomTest", null, (obj) => {
    if (obj.consent === "yes" && obj.contactVia?.email && !obj.patientEmail) {
      return new Yup.ValidationError(
        "Patient Email is required when selecting email contact",
        null,
        "patientEmail"
      );
    }
  });

const PatientDetails = ({
  enrollStep,
  isClicked,
  setEnrollStep,
  icdCodeData,
}) => {
  const { patientEnrollDetails } = useSelector((state) => state?.doctorData);
  const [modalOpen, setModalOpen] = useState(true);
  const [icd10Groups, setIcd10Groups] = useState([]);
  const [icdArray, setIcdArray] = useState([]);
  const [hasSelected, setHasSelected] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    firstName: patientEnrollDetails?.patientDetails?.firstName || "",
    lastName: patientEnrollDetails?.patientDetails?.lastName || "",
    patientEmail: patientEnrollDetails?.patientDetails?.patientEmail || "",
    dob: moment(patientEnrollDetails?.patientDetails?.dob, "MM-DD-YYYY").format(
      "YYYY-MM-DD"
    ),
    // dob:
    //   (patientEnrollDetails?.patientDetails?.dob &&
    //     new Date(patientEnrollDetails.patientDetails.dob)) ||
    //   new Date("01/01/1970"),
    countryCode: patientEnrollDetails?.patientDetails?.countryCode || "+1",
    mobilePhone: patientEnrollDetails?.patientDetails?.mobilePhone || "",
    homePhone: patientEnrollDetails?.patientDetails?.homePhone || "",
    consent: patientEnrollDetails?.patientDetails?.consent || "no",
    patientMRN: patientEnrollDetails?.patientDetails?.patientMRN || "",
    gender: patientEnrollDetails?.patientDetails?.gender || "",
    icdCodes: [],
    contactVia: {
      phone: patientEnrollDetails?.patientDetails?.contactVai?.phone
        ? patientEnrollDetails?.patientDetails?.contactVai.phone
        : false,
      email: patientEnrollDetails?.patientDetails?.contactVai?.email
        ? patientEnrollDetails?.patientDetails?.contactVai.email
        : false,
    },
    language: patientEnrollDetails?.patientDetails?.languages || "English",
  };
  /*   const options = [
    { value: "ICD-1", label: "ICD-1" },
    { value: "ICD-2", label: "ICD-2" },
    { value: "ICD-3", label: "ICD-3" },
    { value: "ICD-1", label: "ICD-1" },
    { value: "ICD-2", label: "ICD-2" },
    { value: "ICD-3", label: "ICD-3" },
    { value: "ICD-1", label: "ICD-1" },
    { value: "ICD-2", label: "ICD-2" },
    { value: "ICD-3", label: "ICD-3" },
  ]; */

  useEffect(() => {
    console.log("Datta------------", icdCodeData);
    let data = icdCodeData.codes;
    if (data) {
      let newArray = data.map((item) => ({
        label: `${item.code} - ${item.description}`, // Create label based on code and description
        value: item.code, // Use code as the value
      }));
      setIcdArray(newArray);

      setIcd10Groups(icdCodeData.groups);
    }
  }, [icdCodeData]);

  const handleSubmit = (values) => {
    console.log(values);
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      dob: moment(values.dob).format("MM-DD-YYYY"),
      patientEmail: values.patientEmail,
      mobilePhone: values.mobilePhone,
      homePhone: values.homePhone,
      patientMRN: values.patientMRN,
      gender: values.gender,
      language: values.language,
      otherLanguage: values?.otherLanguage || "",
      icdCodes: values.icdCodes,
      consent: values.consent,
      contactVai:
        values?.consent === "yes"
          ? values.contactVia
          : { email: false, phone: false },
      countryCode: values.countryCode,
      patientDob: formatDate(values.dob),
    };
    console.log("Patient Details clicked on next", data);
    dispatch(addPatientDetails(data));
    setEnrollStep(2);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && enrollStep === 1 && isClicked && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative bg-white rounded-lg p-4 w-max mx-auto">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, setFieldValue }) => (
                  <Form className="flex flex-col gap-4 bg-[#f6f9fd] p-2 rounded-lg pl-8 pr-8">
                    <div className=" flex flex-row justify-between">
                      <Link to="#" onClick={() => setEnrollStep(0)}>
                        <span aria-hidden="true">
                          <FontAwesomeIcon icon={faArrowLeft} color="#0e55aa" />
                        </span>{" "}
                        Go back
                      </Link>
                      <span className="font-medium">
                        <span className="text-[#0e55aa] font-bold">
                          Step {enrollStep}
                        </span>
                        / 04
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h1 className="flex justify-center text-xl font-medium">
                        Patient Details
                      </h1>
                      <p className="text-sm">* indicates a required field</p>
                    </div>
                    {/* First Name & Last Name */}
                    <div className="flex flex-row gap-6 flex-wrap">
                      <div className="flex flex-col">
                        <Field
                          className=" border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="First Name"
                          aria-describedby="firstNameError"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-600 text-xs"
                        />
                      </div>
                      <div className="flex flex-col">
                        <Field
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Last Name"
                          aria-describedby="lastNameError"
                          className="border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-600 text-xs"
                        />
                      </div>
                    </div>

                    {/* DOB & Email */}
                    <div className="flex flex-row gap-6 flex-wrap mt-2">
                      <div className="flex flex-col">
                        <Field
                          type="date"
                          name="dob"
                          id="dob"
                          placeholder="DOB"
                          aria-describedby="dobError"
                          className="border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="dob"
                          component="div"
                          className="text-red-600 text-xs"
                        />
                      </div>
                      <div className="flex flex-col">
                        <Field
                          type="email"
                          name="patientEmail"
                          id="patientEmail"
                          placeholder="Email"
                          aria-describedby="patientEmailError"
                          className="border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="patientEmail"
                          component="div"
                          className="text-red-600 text-xs"
                        />
                      </div>
                    </div>

                    {/* Country Code */}
                    {/*  <div className="mt-4 border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                     */}
                    <div className="w-72 text-sm rounded-3xl">
                      {/* <Field
                        as="select"
                        name="countryCode"
                        className="bg-transparent"
                        onChange={(event) => {
                          setFieldValue(
                            "countryCode",
                            event.target.value.trim()
                          );
                        }}
                      >
                        <option value="" disabled>
                          Select Country Code
                        </option>
                        <option value="+91">(+91) India</option>
                        <option value="+1">(+1) United States</option>
                      </Field>
                      <ErrorMessage
                        name="countryCode"
                        component="div"
                        className="text-red-600"
                      /> */}

                      <select
                        id="countryCode"
                        name="countryCode" // This should match the field name in your form values
                        value={values.countryCode}
                        onChange={(event) => {
                          setFieldValue(
                            "countryCode",
                            event.target.value.trim()
                          );
                        }}
                        className={`w-full mt-1 px-3 py-2 mb-2 text-black rounded-3xl border ${
                          errors.countryCode && touched.countryCode
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select a countryCode</option>

                        <option value="+91">(+91) India</option>
                        <option value="+1">(+1) United States</option>
                      </select>
                      {errors.countryCode && touched.countryCode && (
                        <p className="text-red-500 text-xs">
                          {errors.countryCode}
                        </p>
                      )}
                    </div>

                    {/* Phone Number and Home Number */}
                    <div className="flex flex-row justify-between mt-2">
                      <div className="flex-col">
                        <Field
                          className="border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="number"
                          name="mobilePhone"
                          placeholder="Phone Number"
                          onChange={(e) => {
                            setFieldValue("mobilePhone", e.target.value);
                          }}
                        />
                        <ErrorMessage
                          name="mobilePhone"
                          component="div"
                          className="text-red-600 text-xs"
                        />
                      </div>
                      <div className="flex-col">
                        <Field
                          className="border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="number"
                          name="homePhone"
                          placeholder="Home Number"
                        />
                        <ErrorMessage
                          name="homePhone"
                          component="div"
                          className="text-red-600 text-xs"
                        />
                      </div>
                    </div>

                    {/* Patient Consent */}
                    <div className="flex flex-row mt-5 gap-10">
                      <div>
                        <fieldset className="flex flex-col gap-3">
                          <p className="text-black-700 font-[500]">
                            Does patient consent to be contacted?
                          </p>
                          <div className="flex flex-row gap-10 justify-start">
                            <div>
                              <Field
                                type="radio"
                                name="consent"
                                id="yes"
                                value="yes"
                              />
                              <label htmlFor="yes">Yes</label>
                            </div>
                            <div>
                              <Field
                                type="radio"
                                name="consent"
                                id="no"
                                value="no"
                              />
                              <label htmlFor="no">No</label>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      <div>
                        {values.consent === "yes" && (
                          <fieldset className="flex flex-col gap-3">
                            <p className="text-black-700 font-[500]">
                              Contact via
                            </p>
                            <div className="flex flex-row gap-10">
                              <div className="flex flex-row gap-2">
                                <Field
                                  type="checkbox"
                                  name="contactVia.email"
                                  id="contactEmail"
                                  value={values.contactVia?.email}
                                  checked={values.contactVia?.email}
                                />
                                <label htmlFor="contactEmail">Email</label>
                              </div>
                              <div className="flex flex-row gap-2">
                                <Field
                                  type="checkbox"
                                  name="contactVia.phone"
                                  id="contactPhone"
                                  value={values.contactVia?.phone}
                                  checked={values.contactVia?.phone}
                                />
                                <label htmlFor="contactPhone">Text</label>
                              </div>
                            </div>
                            {values.consent &&
                              values.contactVia.email === false && (
                                <p
                                  name="contactVia"
                                  component="div"
                                  className="text-red-600 text-xs"
                                  p
                                >
                                  Select at least one option
                                </p>
                              )}
                          </fieldset>
                        )}
                      </div>
                    </div>

                    {/* MRN & Gender */}
                    <div className="flex flex-row mt-5 gap-5 flex-wrap">
                      <div className="flex flex-col">
                        <Field
                          className="border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          name="patientMRN"
                          id="patientMRN"
                          placeholder="Patient MRN"
                        />
                        <ErrorMessage
                          name="patientMRN"
                          component="div"
                          className="text-red-600 text-xs"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="w-72 text-sm rounded-3xl">
                          <select
                            id="gender"
                            name="gender" // This should match the field name in your form values
                            value={values.gender}
                            onChange={(event) => {
                              setFieldValue(
                                "gender",
                                event.target.value.trim()
                              );
                            }}
                            className={`w-full mt-1 p-2.5 mb-2 text-black rounded-3xl border ${
                              errors.gender && touched.gender
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <option value="">Select a gender</option>

                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                          </select>
                          {errors.gender && touched.gender && (
                            <p className="text-red-500 text-xs">
                              {errors.gender}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ICD code and Language */}
                    <div className="flex flex-row gap-5">
                      <div>
                        {/* <Select
                          className="text-sm rounded-3xl w-72"
                          name="icdCodes"
                          id="icdCodes"
                          onChange={(selectedOption) => {
                            setFieldValue(
                              "icdCodes",
                              selectedOption
                                ? selectedOption.map((option) => option.name)
                                : []
                            );
                            setHasSelected(true);
                          }}
                          placeholder="Select an ICD Code"
                          options={icdArray}
                          isMulti
                          maxMenuHeight={220}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              width: "full",
                              padding: "4px",
                              borderRadius: "25px",
                              borderColor:
                                !hasSelected && errors.touched
                                  ? "red"
                                  : "black",
                              "&:hover": {
                                borderColor: "black",
                              },
                            }),
                            menu: (provided) => ({
                              ...provided,
                              maxHeight: 220, // Adjust this value as needed
                            }),
                          }}
                        /> */}

                        <IcdDropdown
                          icdArray={icdArray}
                          icdCodes={values.icdCodes}
                          icd10Groups={icd10Groups}
                          setICDCodes={(codes) =>
                            setFieldValue("icdCodes", codes)
                          }
                        />

                        {!hasSelected && errors.touched && errors.icdCodes && (
                          <p className="text-red-500 text-xs">
                            {errors.icdCodes}
                          </p>
                        )}
                        {/* {!hasSelected && (
                          <ErrorMessage
                            name="icdCodes"
                            component="div"
                            className="text-red-600 text-xs"
                          />
                        )} */}
                      </div>
                      <div className="flex flex-col  gap-5">
                        <div>
                          <fieldset className="flex flex-col">
                            <p className="font-medium">Choose Language</p>
                            <div className="flex flex-row gap-5">
                              <div className="flex flex-row gap-1">
                                <Field
                                  type="radio"
                                  name="language"
                                  id="english"
                                  value="English"
                                />
                                <label htmlFor="english">English</label>
                              </div>
                              <div className="flex flex-row gap-1">
                                <Field
                                  type="radio"
                                  name="language"
                                  id="spanish"
                                  value="Spanish"
                                />
                                <label htmlFor="spanish">Spanish</label>
                              </div>
                              <div className="flex flex-row gap-1">
                                <Field
                                  type="radio"
                                  name="language"
                                  id="other"
                                  value="other"
                                />
                                <label htmlFor="other">Other</label>
                              </div>
                            </div>
                          </fieldset>
                          <ErrorMessage
                            name="language"
                            component="div"
                            className="text-red-600 text-xs"
                          />
                        </div>
                        <div>
                          {values.language === "other" && (
                            <Field
                              className="border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              type="text"
                              name="otherLanguage"
                              id="otherLanguage"
                              placeholder="Other Language"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer p-4 flex flex-row justify-between">
                      <button
                        className="w-72 rounded-lg bg-[#61636B] hover:bg-[#343a40] border-2 pt-2.5 pb-2.5 text-sm justify-center text-white font-[450]"
                        onClick={handleClose}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-72 rounded-lg bg-[#0e55aa] hover:bg-[#05346c] border-2 pt-2.5 pb-2.5 text-sm justify-center text-white font-[450]"
                      >
                        Next : Patient Address
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientDetails;
