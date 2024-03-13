import React, { useState } from "react";
import { Modal, Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../store/reducers/enrollPatientReducer";
import { verifyAddressAction } from "../store/actions/enrollPatientAction";

const PatientThresholds = ({ enrollStep, isClicked, setEnrollStep }) => {
  const [modalOpen, setModalOpen] = useState(true);

  const [params, setParams] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values);
    console.log("clicked on next");
  };

  const validationSchema = Yup.object().shape({});

  const handleClose = () => {
    setModalOpen(false);
    //onClose();
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
                validationSchema={Yup.object({
                  systolicHighSingle: Yup.number().required("Required"),
                  systolicLowSingle: Yup.number().required("Required"),
                  diastolicHighSingle: Yup.number().required("Required"),
                  diastolicLowSingle: Yup.number().required("Required"),
                  systolicHighAverage: Yup.number().required("Required"),
                  systolicLowAverage: Yup.number().required("Required"),
                  diastolicHighAverage: Yup.number().required("Required"),
                  diastolicLowAverage: Yup.number().required("Required"),
                  weightGain24: Yup.number().required("Required"),
                  weightGain72: Yup.number().required("Required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="systolicHighSingle"
                      >
                        Blood Pressure Threshold (single reading)
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <label
                            className="w-12 text-sm font-medium text-gray-700 mr-2"
                            htmlFor="systolicHighSingle"
                          >
                            Sys high (mmHg)
                          </label>
                          <Field
                            type="number"
                            name="systolicHighSingle"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            className="w-12 text-sm font-medium text-gray-700 mr-2"
                            htmlFor="systolicLowSingle"
                          >
                            Sys low (mmHg)
                          </label>
                          <Field
                            type="number"
                            name="systolicLowSingle"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <label
                            className="w-12 text-sm font-medium text-gray-700 mr-2"
                            htmlFor="diastolicHighSingle"
                          >
                            Dia high (mmHg)
                          </label>
                          <Field
                            type="text"
                            name="diastolicHighSingle"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            className="w-12 text-sm font-medium text-gray-700 mr-2"
                            htmlFor="diastolicLowSingle"
                          >
                            Dia Low (mmHg)
                          </label>
                          <Field
                            type="text"
                            name="diastolicLowSingle"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
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
