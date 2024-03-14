import React, { useState } from "react";
import { Modal, Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../store/reducers/enrollPatientReducer";
import { verifyAddressAction } from "../store/actions/enrollPatientAction";
import "../css/PatientThresholds.css";

const PatientThresholds = ({ enrollStep, isClicked, setEnrollStep }) => {
  const [modalOpen, setModalOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [checked7Days, setChecked7Days] = useState(false);
  const [checked10Readings, setChecked10Reading] = useState(false);

  const [params, setParams] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values);
    console.log("clicked on next");
  };

  const validationSchema = Yup.lazy(() => {
    if (showAll) {
      return Yup.object().shape({
        systolicLowSingle: Yup.number()
          .min(0, "Sys Limit Must be greater than 0")
          .max(999, "Sys Limit Must not exceed 999")
          .typeError("Invalid Value"),
        systolicHighSingle: Yup.number()
          .min(0, "Sys Limit Must be greater than 0")
          .max(999, "Sys Limit Must not exceed 999")
          .typeError("Invalid Value")
          .when("systolicLowSingle", (systolicLowSingle, schema) => {
            return schema.test({
              test: (systolicHighSingle) =>
                !systolicLowSingle || systolicHighSingle > systolicLowSingle,
              message: "Sys Upper limit should be higher",
            });
          }),
        diastolicLowSingle: Yup.number()
          .min(0, "Dia Limit Must be greater than 0")
          .max(999, "Dia Limit Must not exceed 999")
          .typeError("Invalid Value"),
        diastolicHighSingle: Yup.number()
          .min(0, "Dia Limit Must be greater than 0")
          .max(999, "Dia Limit Must not exceed 999")
          .typeError("Invalid Value")
          .when("systolicLowSingle", (systolicLowSingle, schema) => {
            return schema.test({
              test: (systolicHighSingle) => {
                // If systolicLowSingle is not defined or systolicHighSingle > systolicLowSingle, return true
                // If systolicLowSingle is undefined, we return true to allow for the case where both fields are empty
                return (
                  !systolicLowSingle || systolicHighSingle > systolicLowSingle
                );
              },
              message: "Sys Upper limit should be higher",
            });
          })
          .nullable(true),
        systolicLowAverage: Yup.number()
          .min(0, "Sys Limit Must be greater than 0")
          .max(999, "Sys Limit Must not exceed 999")
          .typeError("Invalid Value"),
        systolicHighAverage: Yup.number()
          .min(0, "Sys Limit Must be greater than 0")
          .max(999, "Sys Limit Must not exceed 999")
          .typeError("Invalid Value")
          .when("systolicLowAverage", (systolicLowAverage, schema) => {
            return schema.test({
              test: (systolicHighAverage) =>
                !systolicLowAverage || systolicHighAverage > systolicLowAverage,
              message: "Sys Upper limit should be higher",
            });
          }),
        diastolicLowAverage: Yup.number()
          .min(0, "Dia Limit Must be greater than 0")
          .max(999, "Dia Limit Must not exceed 999")
          .typeError("Invalid Value"),
        diastolicHighAverage: Yup.number()
          .min(0, "Dia Limit Must be greater than 0")
          .max(999, "Dia Limit Must not exceed 999")
          .typeError("Invalid Value")
          .when("diastolicLowAverage", (diastolicLowAverage, schema) => {
            return schema.test({
              test: (diastolicHighAverage) =>
                !diastolicLowAverage ||
                diastolicHighAverage > diastolicLowAverage,
              message: "Dia Upper limit should be higher",
            });
          }),
        weightGain24: Yup.number()
          .min(0, "Minimum value should be 0")
          .max(20, "Maximum value should be 20")
          .typeError("Invalid Value"),
        weightGain72: Yup.number()
          .min(0, "Minimum value should be 0")
          .max(20, "Maximum value should be 20")
          .typeError("Invalid Value"),
      });
    } else {
      return Yup.mixed().notRequired();
    }
  });

  const handleClose = () => {
    setModalOpen(false);
    //onClose();
  };

  const preventNoNum = (e) => {
    if (["-", "+", "e", ".", "E"].includes(e.key)) e.preventDefault();
  };

  return (
    <>
      {modalOpen && enrollStep === 3 && isClicked && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleClose}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative bg-white rounded-lg p-8 w-9/12 mx-auto">
              <Formik
                initialValues={{
                  systolicHighSingle: "",
                  systolicLowSingle: "",
                  diastolicHighSingle: "",
                  diastolicLowSingle: "",
                  systolicHighAverage: "",
                  systolicLowAverage: "",
                  diastolicHighAverage: "",
                  diastolicLowAverage: "",
                  weightGain24: "",
                  weightGain72: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                  //alert(JSON.stringify(values, null, 2));
                  //setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center items-center gap-4">
                      <h1 className="text-xl font-bold text-gray-700 mb-2">
                        Set Thresholds
                      </h1>
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <label htmlFor="show-fields" className="text-sm">
                          I will set the Thresholds later
                        </label>
                        <input
                          type="checkbox"
                          id="show-fields"
                          checked={!showAll}
                          onChange={() => setShowAll(!showAll)}
                          className="mr-2 w-5 h-5 accent-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    {showAll && (
                      <>
                        <div className="flex flex-col gap-8">
                          <div className="flex flex-col gap-4">
                            <label
                              className="block text-sm font-bold text-gray-700 mb-2"
                              htmlFor="systolicHighSingle"
                            >
                              Blood Pressure Threshold (single reading)
                            </label>
                            {/* BP Single Reading for Sys and Dia both Low and High*/}
                            <div className="grid grid-cols-2 gap-6">
                              <div className="flex flex-col items-center justify-center">
                                <label
                                  className={
                                    "w-40 text-xs font-small text-gray-700" +
                                      values.systolicHighSingle >=
                                      0 &&
                                    values.systolicHighSingle !== "" &&
                                    values.systolicHighSingle !== null
                                      ? "mb-4"
                                      : "hidden"
                                  }
                                  htmlFor="systolicHighSingle"
                                >
                                  Sys high (mmHg)
                                </label>

                                <Field
                                  type="number"
                                  name="systolicHighSingle"
                                  aria-describedby="systolicHighSingleError"
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "systolicHighSingle",
                                      event.target.value.trim()
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  id="systolicHighSingle"
                                  min="0"
                                  onKeyDown={preventNoNum}
                                  placeholder=" Sys high (mmHg)"
                                />

                                {values.systolicHighSingle && (
                                  <div
                                    name="systolicHighSingle"
                                    component="div"
                                    className="text-red-500 text-xs"
                                    id="systolicHighSingle"
                                  >
                                    {errors &&
                                    errors.systolicHighSingle &&
                                    touched &&
                                    touched.systolicHighSingle
                                      ? errors.systolicHighSingle
                                      : ""}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col items-center justify-center">
                                <label
                                  className={
                                    "w-40 text-xs font-small text-gray-700" +
                                      values.systolicLowSingle >=
                                      0 &&
                                    values.systolicLowSingle !== "" &&
                                    values.systolicLowSingle !== null
                                      ? "mb-4"
                                      : "hidden"
                                  }
                                  htmlFor="systolicLowSingle"
                                >
                                  Sys Low (mmHg)
                                </label>
                                <Field
                                  type="number"
                                  name="systolicLowSingle"
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "systolicLowSingle",
                                      event.target.value.trim()
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  onKeyDown={preventNoNum}
                                  min="0"
                                  placeholder=" Sys Low (mmHg)"
                                />
                                <div
                                  name="systolicLowSingle"
                                  component="div"
                                  className="text-red-500 text-xs"
                                >
                                  {errors &&
                                  errors.systolicLowSingle &&
                                  touched &&
                                  touched.systolicLowSingle
                                    ? errors.systolicLowSingle
                                    : ""}
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="flex flex-col items-center justify-center">
                                <label
                                  className={
                                    "w-40 text-xs font-small text-gray-700" +
                                      values.diastolicHighSingle >=
                                      0 &&
                                    values.diastolicHighSingle !== "" &&
                                    values.diastolicHighSingle !== null
                                      ? "mb-4"
                                      : "hidden"
                                  }
                                  htmlFor="diastolicHighSingle"
                                >
                                  Dia high (mmHg)
                                </label>

                                <Field
                                  type="number"
                                  name="diastolicHighSingle"
                                  aria-describedby="diastolicHighSingleError"
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "diastolicHighSingle",
                                      event.target.value.trim()
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  id="diastolicHighSingle"
                                  min="0"
                                  onKeyDown={preventNoNum}
                                  placeholder=" Dia high (mmHg)"
                                />

                                {values.diastolicHighSingle && (
                                  <div
                                    name="diastolicHighSingle"
                                    component="div"
                                    className="text-red-500 text-xs"
                                    id="diastolicHighSingle"
                                  >
                                    {errors &&
                                    errors.diastolicHighSingle &&
                                    touched &&
                                    touched.diastolicHighSingle
                                      ? errors.diastolicHighSingle
                                      : ""}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col items-center justify-center">
                                <label
                                  className={
                                    "w-40 text-xs font-small text-gray-700" +
                                      values.diastolicLowSingle >=
                                      0 &&
                                    values.diastolicLowSingle !== "" &&
                                    values.diastolicLowSingle !== null
                                      ? "mb-4"
                                      : "hidden"
                                  }
                                  htmlFor="diastolicLowSingle"
                                >
                                  Dia Low (mmHg)
                                </label>
                                <Field
                                  type="number"
                                  name="diastolicLowSingle"
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "diastolicLowSingle",
                                      event.target.value.trim()
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  onKeyDown={preventNoNum}
                                  min="0"
                                  placeholder=" Dia Low (mmHg)"
                                />
                                <div
                                  name="diastolicLowSingle"
                                  component="div"
                                  className="text-red-500 text-xs"
                                >
                                  {errors &&
                                  errors.diastolicLowSingle &&
                                  touched &&
                                  touched.diastolicLowSingle
                                    ? errors.diastolicLowSingle
                                    : ""}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* BP Average  */}
                        <div className="flex flex-col gap-4 mt-4">
                          <div className="flex flex-row gap-4">
                            <label
                              className="block text-sm text-gray-700 font-bold"
                              htmlFor="systolicHighSingle"
                            >
                              Blood Pressure Threshold (Average)
                            </label>
                            <div className="flex items-center justify-center gap-1">
                              <label htmlFor="seven-days" className="text-sm">
                                7 Days
                              </label>
                              <input
                                type="checkbox"
                                id="seven-days"
                                checked={checked7Days}
                                onChange={() => setChecked7Days(!checked7Days)}
                                className="mr-2 w-5 h-5 accent-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <label htmlFor="ten-days" className="text-sm">
                                10 Days
                              </label>
                              <input
                                type="checkbox"
                                id="ten-days"
                                checked={checked10Readings}
                                onChange={() =>
                                  setChecked10Reading(!checked10Readings)
                                }
                                className="mr-2 w-5 h-5 accent-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          {/* BP Average Reading for Sys and Dia both Low and High*/}
                          <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col items-center justify-center">
                              <label
                                className={
                                  "w-40 text-xs font-small text-gray-700" +
                                    values.systolicHighAverage >=
                                    0 &&
                                  values.systolicHighAverage !== "" &&
                                  values.systolicHighAverage !== null
                                    ? "mb-4"
                                    : "hidden"
                                }
                                htmlFor="systolicHighAverage"
                              >
                                Sys high (mmHg)
                              </label>

                              <Field
                                type="number"
                                name="systolicHighAverage"
                                aria-describedby="systolicHighAverageError"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(event) => {
                                  setFieldValue(
                                    "systolicHighAverage",
                                    event.target.value.trim()
                                  );
                                }}
                                onBlur={handleBlur}
                                id="systolicHighAverage"
                                min="0"
                                onKeyDown={preventNoNum}
                                placeholder=" Sys high (mmHg)"
                              />

                              {values.systolicHighAverage && (
                                <div
                                  name="systolicHighAverage"
                                  component="div"
                                  className="text-red-500 text-xs"
                                  id="systolicHighAverage"
                                >
                                  {errors &&
                                  errors.systolicHighAverage &&
                                  touched &&
                                  touched.systolicHighAverage
                                    ? errors.systolicHighAverage
                                    : ""}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <label
                                className={
                                  "w-40 text-xs font-small text-gray-700" +
                                    values.systolicLowAverage >=
                                    0 &&
                                  values.systolicLowAverage !== "" &&
                                  values.systolicLowAverage !== null
                                    ? "mb-4"
                                    : "hidden"
                                }
                                htmlFor="systolicLowAverage"
                              >
                                Sys Low (mmHg)
                              </label>
                              <Field
                                type="number"
                                name="systolicLowAverage"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(event) => {
                                  setFieldValue(
                                    "systolicLowAverage",
                                    event.target.value.trim()
                                  );
                                }}
                                onBlur={handleBlur}
                                onKeyDown={preventNoNum}
                                min="0"
                                placeholder=" Sys Low (mmHg)"
                              />
                              <div
                                name="systolicLowAverage"
                                component="div"
                                className="text-red-500 text-xs"
                              >
                                {errors &&
                                errors.systolicLowAverage &&
                                touched &&
                                touched.systolicLowAverage
                                  ? errors.systolicLowAverage
                                  : ""}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col items-center justify-center">
                              <label
                                className={
                                  "w-40 text-xs font-small text-gray-700" +
                                    values.diastolicHighAverage >=
                                    0 &&
                                  values.diastolicHighAverage !== "" &&
                                  values.diastolicHighAverage !== null
                                    ? "mb-4"
                                    : "hidden"
                                }
                                htmlFor="diastolicHighAverage"
                              >
                                Sys high (mmHg)
                              </label>

                              <Field
                                type="number"
                                name="diastolicHighAverage"
                                aria-describedby="diastolicHighAverageError"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(event) => {
                                  setFieldValue(
                                    "diastolicHighAverage",
                                    event.target.value.trim()
                                  );
                                }}
                                onBlur={handleBlur}
                                id="diastolicHighAverage"
                                min="0"
                                onKeyDown={preventNoNum}
                                placeholder=" Dia high (mmHg)"
                              />

                              {values.diastolicHighAverage && (
                                <div
                                  name="diastolicHighAverage"
                                  component="div"
                                  className="text-red-500 text-xs"
                                  id="diastolicHighAverage"
                                >
                                  {errors &&
                                  errors.diastolicHighAverage &&
                                  touched &&
                                  touched.diastolicHighAverage
                                    ? errors.diastolicHighAverage
                                    : ""}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <label
                                className={
                                  "w-40 text-xs font-small text-gray-700" +
                                    values.diastolicLowAverage >=
                                    0 &&
                                  values.diastolicLowAverage !== "" &&
                                  values.diastolicLowAverage !== null
                                    ? "mb-4"
                                    : "hidden"
                                }
                                htmlFor="diastolicLowAverage"
                              >
                                Sys Low (mmHg)
                              </label>
                              <Field
                                type="number"
                                name="diastolicLowAverage"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={(event) => {
                                  setFieldValue(
                                    "diastolicLowAverage",
                                    event.target.value.trim()
                                  );
                                }}
                                onBlur={handleBlur}
                                onKeyDown={preventNoNum}
                                min="0"
                                placeholder=" Dia Low (mmHg)"
                              />
                              {values.diastolicLowAverage && (
                                <div
                                  name="diastolicLowAverage"
                                  component="div"
                                  className="text-red-500 text-xs"
                                  id="diastolicLowAverage"
                                >
                                  {errors &&
                                  errors.diastolicLowAverage &&
                                  touched &&
                                  touched.diastolicLowAverage
                                    ? errors.diastolicLowAverage
                                    : ""}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Weight Gain */}
                          <div className="flex flex-col gap-4 mt-2">
                            <label
                              className="block text-sm font-bold text-gray-700"
                              htmlFor="WeightGain"
                            >
                              Weight Gain Threshold
                            </label>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col items-center justify-center">
                                <label
                                  className={
                                    "w-40 text-xs font-small text-gray-700" +
                                      values.weightGain24 >=
                                      0 &&
                                    values.weightGain24 !== "" &&
                                    values.weightGain24 !== null
                                      ? "mb-4"
                                      : "hidden"
                                  }
                                  htmlFor="weightGain24"
                                >
                                  24 hr (lbs)
                                </label>
                                <Field
                                  type="number"
                                  name="weightGain24"
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "weightGain24",
                                      event.target.value.trim()
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  id="weightGain24"
                                  min="0"
                                  onKeyDown={preventNoNum}
                                  placeholder="24hr (lbs)"
                                />

                                {values.weightGain24 && (
                                  <div
                                    name="weightGain24"
                                    component="div"
                                    className="text-red-500 text-xs"
                                    id="weightGain24"
                                  >
                                    {errors &&
                                    errors.weightGain24 &&
                                    touched &&
                                    touched.weightGain24
                                      ? errors.weightGain24
                                      : ""}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col items-center justify-center">
                                <label
                                  className={
                                    "w-40 text-xs font-small text-gray-700" +
                                      values.weightGain72 >=
                                      0 &&
                                    values.weightGain72 !== "" &&
                                    values.weightGain72 !== null
                                      ? "mb-4"
                                      : "hidden"
                                  }
                                  htmlFor="weightGain72"
                                >
                                  72hr (lbs)
                                </label>
                                <Field
                                  type="number"
                                  name="weightGain72"
                                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "weightGain72",
                                      event.target.value.trim()
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  onKeyDown={preventNoNum}
                                  min="0"
                                  placeholder="72 hr (lbs)"
                                />
                                {values.weightGain72 && (
                                  <div
                                    name="weightGain72"
                                    component="div"
                                    className="text-red-500 text-xs"
                                    id="weightGain72"
                                  >
                                    {errors &&
                                    errors.weightGain72 &&
                                    touched &&
                                    touched.weightGain72
                                      ? errors.weightGain72
                                      : ""}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="modal-footer p-4 flex flex-row justify-between">
                      <button
                        className="w-32 rounded-full bg-cyan-400 border-2 p-1 text-sm justify-center"
                        onClick={handleClose}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-fit rounded-full bg-cyan-400 border-2 p-2 text-sm justify-center"
                        // onClick={handleSubmit}
                      >
                        Next: Patient Details
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

export default PatientThresholds;
