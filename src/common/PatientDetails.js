import React, { useEffect, useState } from "react";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";

const validationSchema = Yup.object().shape({
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
  mobilePhone: Yup.string().required("Phone number is required"),
  homePhone: Yup.string(),
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
  contactVia: Yup.object()
    .shape({
      email: Yup.boolean(),
      phone: Yup.boolean(),
    })
    .test(
      "at-least-one",
      "Please select at least one contact option",
      (value) => value.email || value.phone
    ),
});

const PatientDetails = ({
  enrollStep,
  isClicked,
  setEnrollStep,
  icdCodeData,
}) => {
  const [modalOpen, setModalOpen] = useState(true);
  const [icd10Codes, setIcd10Codes] = useState([]);
  const initialValues = {
    firstName: "",
    lastName: "",
    patientEmail: "",
    dob: "",
    countryCode: "+1",
    mobilePhone: "",
    homePhone: "",
    consent: "no",
    patientMRN: "",
    gender: "",
    icdCodes: [],
    contactVia: { phone: false, email: false },
    language: "English",
  };
  const options = [
    { value: "ICD-1", label: "ICD-1" },
    { value: "ICD-2", label: "ICD-3" },
    { value: "ICD-3", label: "ICD-3" },
  ];
  useEffect(() => {
    setIcd10Codes(options);
  }, [icdCodeData]);

  const handleSubmit = (values) => {
    console.log(values);
    console.log("Patient Details clicked on next");
    setEnrollStep(1);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && enrollStep === 0 && isClicked && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleClose}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative bg-white rounded-lg p-8 w-max mx-auto">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, setFieldValue }) => (
                  <Form className="flex flex-col">
                    {/* First Name & Last Name */}
                    <div className="flex flex-row  gap-5 flex-wrap">
                      <div className="flex flex-col gap-10">
                        <Field
                          className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="First Name"
                          aria-describedby="firstNameError"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <div className="flex flex-col">
                        <Field
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Last Name"
                          aria-describedby="lastNameError"
                          className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>

                    {/* DOB & Email */}
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col">
                        <Field
                          type="date"
                          name="dob"
                          id="dob"
                          placeholder="DOB"
                          aria-describedby="dobError"
                          className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="dob"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <div className="flex flex-row">
                        <Field
                          type="email"
                          name="patientEmail"
                          id="patientEmail"
                          placeholder="Email"
                          aria-describedby="patientEmailError"
                          className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="patientEmail"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>

                    {/* Country Code */}
                    <div className="mt-10 bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <Field
                        as="select"
                        name="countryCode"
                        className="bg-transparent"
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
                      />
                    </div>

                    {/* Phone Number and Home Number */}
                    <div className="flex flex-row justify-between mt-10">
                      <div className="flex-col">
                        <Field
                          className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="number"
                          name="mobilePhone"
                          placeholder="Phone Number"
                        />
                        <ErrorMessage
                          name="mobilePhone"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <div className="flex-col">
                        <Field
                          className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="number"
                          name="homePhone"
                          placeholder="Home Number"
                        />
                        <ErrorMessage
                          name="homePhone"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>

                    {/* Patient Consent */}
                    <div className="flex flex-row mt-5 gap-10">
                      <div>
                        <fieldset className="flex flex-col">
                          <p>Does patient consent to be contacted?</p>
                          <div className="flex flex-row gap-5">
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
                          <fieldset className="flex flex-col">
                            <legend>Contact via</legend>
                            <div className="flex flex-row gap-5">
                              <div>
                                <Field
                                  type="checkbox"
                                  name="contactVia.email"
                                  id="contactEmail"
                                />
                                <label htmlFor="contactEmail">Email</label>
                              </div>
                              <div className="col-8">
                                <Field
                                  type="checkbox"
                                  name="contactVia.phone"
                                  id="contactPhone"
                                />
                                <label htmlFor="contactPhone">Text</label>
                              </div>
                            </div>
                            <ErrorMessage
                              name="contactVia"
                              component="div"
                              className="text-red-600"
                            />
                          </fieldset>
                        )}
                      </div>
                    </div>

                    {/* MRN & Gender */}
                    <div className="flex flex-row mt-10 gap-5 flex-wrap">
                      <div className="flex flex-col gap-10">
                        <Field
                          className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="text"
                          name="patientMRN"
                          id="patientMRN"
                          placeholder="Patient MRN"
                        />
                        <ErrorMessage
                          name="patientMRN"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <Field
                            as="select"
                            name="gender"
                            className="bg-transparent"
                          >
                            <option value="" disabled>
                              Select Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </Field>
                        </div>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>

                    {/* ICD code and Language */}
                    <div className="flex flex-row gap-5">
                      <div className="rounded-lg">
                        <Select
                          className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="icdCodes"
                          onChange={(selectedOption) => {
                            setFieldValue(
                              "icdCodes",
                              selectedOption
                                ? selectedOption.map((option) => option.value)
                                : []
                            );
                          }}
                          placeholder="Select ICD Codes"
                          options={icd10Codes}
                          isMulti
                        />
                        <ErrorMessage
                          name="icdCodes"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                      <div className="flex flex-row mt-5 gap-10">
                        <div>
                          <fieldset className="flex flex-col">
                            <p>Choose Language</p>
                            <div className="flex flex-row gap-5">
                              <div>
                                <Field
                                  type="radio"
                                  name="language"
                                  id="english"
                                  value="English"
                                />
                                <label htmlFor="english">English</label>
                              </div>
                              <div>
                                <Field
                                  type="radio"
                                  name="language"
                                  id="spanish"
                                  value="Spanish"
                                />
                                <label htmlFor="spanish">Spanish</label>
                              </div>
                              <div>
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
                            className="text-red-600"
                          />
                        </div>
                        <div className="flex flex-col">
                          {values.language === "other" && (
                            <Field
                              className="bg-gray-50 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              type="text"
                              name="otherLanguage"
                              id="otherLanguage"
                              placeholder="Other Language"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <button type="submit">Next</button>
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
