import React, { useState } from "react";
import { Modal, Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../store/reducers/enrollPatientReducer";

const validationSchema = Yup.object().shape({
  addressLine1: Yup.string().required("Address Line 1 is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string()
    .required("Zip code is required")
    .matches(/^\d{5}(-\d{4})?$/, "Invalid zip code"),
});

const PatientAddress = ({ enrollStep, isClicked, setEnrollStep }) => {
  const [modalOpen, setModalOpen] = useState(true);
  const [showOtherAddress, setShowOtherAddress] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values);
    console.log("clicked on next");
    const params = {
      address: {
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2 ? values.addressLine2 : "",
        city: values.city,
        countryCode: "US",
        state: values.state,
        zip: values.zip,
      },
    };
    console.log("params", params);
    dispatch(fetchAddress(params));
    //setEnrollStep(2);
  };

  const handleClose = () => {
    setModalOpen(false);
    //onClose();
  };

  return (
    <>
      {modalOpen && enrollStep === 1 && isClicked && (
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
                  addressLine1: "",
                  addressLine2: "",
                  city: "",
                  state: "",
                  zip: "",
                  useOtherAddress: false,
                  otherAddressLine1: "",
                  otherAddressLine2: "",
                  otherCity: "",
                  otherState: "",
                  otherZip: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                {({ values, errors, touched }) => (
                  <Form className="space-y-4">
                    <div className="flex flex-col md:flex-row md:space-x-4">
                      <div className="flex flex-col w-full">
                        <label htmlFor="addressLine1">Address Line 1</label>
                        <Field
                          type="text"
                          id="addressLine1"
                          name="addressLine1"
                          className="input-field"
                        />
                        <ErrorMessage
                          name="addressLine1"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <label htmlFor="addressLine2">Address Line 2</label>
                        <Field
                          type="text"
                          id="addressLine2"
                          name="addressLine2"
                          className="input-field"
                        />
                        <ErrorMessage
                          name="addressLine2"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-4">
                      <div className="flex flex-col w-full">
                        <label htmlFor="city">City</label>
                        <Field
                          type="text"
                          id="city"
                          name="city"
                          className="input-field"
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <label htmlFor="state">State</label>
                        <Field
                          as="select"
                          id="state"
                          name="state"
                          className="input-field"
                        >
                          <option value="">Select State</option>
                          <option value="NY">New York</option>
                          <option value="CA">California</option>
                          <option value="TX">Texas</option>
                        </Field>
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <label htmlFor="zip">Zip</label>
                        <Field
                          type="text"
                          id="zip"
                          name="zip"
                          className="input-field"
                        />
                        <ErrorMessage
                          name="zip"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Field
                        type="checkbox"
                        id="useOtherAddress"
                        name="useOtherAddress"
                        className="h-4 w-4 text-blue-500"
                        onClick={() => setShowOtherAddress(!showOtherAddress)}
                      />
                      <label htmlFor="useOtherAddress" className="text-sm">
                        Use other address than primary
                      </label>
                    </div>
                    {showOtherAddress && (
                      <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex flex-col w-full">
                          <label htmlFor="otherAddressLine1">
                            Other Address Line 1
                          </label>
                          <Field
                            type="text"
                            id="otherAddressLine1"
                            name="otherAddressLine1"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="otherAddressLine1"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label htmlFor="otherAddressLine2">
                            Other Address Line 2
                          </label>
                          <Field
                            type="text"
                            id="otherAddressLine2"
                            name="otherAddressLine2"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="otherAddressLine2"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label htmlFor="otherCity">Other City</label>
                          <Field
                            type="text"
                            id="otherCity"
                            name="otherCity"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="otherCity"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label htmlFor="otherState">Other State</label>
                          <Field
                            as="select"
                            id="otherState"
                            name="otherState"
                            className="input-field"
                          >
                            <option value="">Select State</option>
                            <option value="NY">New York</option>
                            <option value="CA">California</option>
                            <option value="TX">Texas</option>
                          </Field>
                          <ErrorMessage
                            name="otherState"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                        <div className="flex flex-col w-full">
                          <label htmlFor="otherZip">Other Zip</label>
                          <Field
                            type="text"
                            id="otherZip"
                            name="otherZip"
                            className="input-field"
                          />
                          <ErrorMessage
                            name="otherZip"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="btn btn-secondary mr-2"
                        onClick={() => console.log("Cancel clicked")}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Next
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

export default PatientAddress;
