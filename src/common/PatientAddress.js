import React, { useState } from "react";
import { Modal, Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../store/reducers/enrollPatientReducer";
import { verifyAddressAction } from "../store/actions/enrollPatientAction";

const PatientAddress = ({ enrollStep, isClicked, setEnrollStep }) => {
  const [modalOpen, setModalOpen] = useState(true);
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const [addressReceived, setaddressReceived] = useState(false);
  const [addressErrorMessage, setAddressErrorMessage] = useState("");
  const [enteredAddress, setEnteredAddress] = useState({});
  const [finalAddress, setFinalAddress] = useState();
  const [whichAddress, setWhichAddress] = useState("");
  const [whichSuggestedAddress, setWhichSuggestedAddress] = useState(0);
  const [params, setParams] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values);
    console.log("clicked on next");
    // let params = {};
    if (showShippingAddress) {
      const shippingAdressDetails = {
        address: {
          addressLine1: values.shippingAddressLine1,
          addressLine2: values.shippingAddressLine2
            ? values.shippingAddressLine2
            : "",
          city: values.shippingCity,
          countryCode: "US",
          state: values.shippingState,
          zip: values.shippingZip,
        },
      };
      setParams(shippingAdressDetails);
    } else {
      setParams({});
      const primaryAddressDetails = {
        address: {
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2 ? values.addressLine2 : "",
          city: values.city,
          countryCode: "US",
          state: values.state,
          zip: values.zip,
        },
      };
      setParams(primaryAddressDetails);
    }
    setAddressErrorMessage("");
    setSuggestedAddresses("");
    console.log("params", params);
    if (whichAddress === "") {
      const response = dispatch(verifyAddressAction(params));
      response
        .then((response) => {
          if (response.success) {
            setaddressReceived(true);
            setSuggestedAddresses(response.data.candidate);
            console.log("sugggg", response.data.candidate);
            setEnteredAddress(params);
            console.log(response);
            //params.suggestedAddresses = response.data.candidate;
          } else {
            setAddressErrorMessage(response.message);
            console.log(response);
          }
        })
        .catch((error) => {
          console.log("error address is", error);
        });
    }
    if (whichAddress !== "" && whichAddress === "enteredAddress") {
      setFinalAddress(params);
      console.log("Final Address", finalAddress);
      setSuggestedAddresses([]);
      setWhichAddress("");
      setEnrollStep(2);
    } else {
      console.log("Finalll", suggestedAddresses[whichSuggestedAddress]);
      setSuggestedAddresses([]);
      setWhichAddress("");

      setShowShippingAddress("");
      console.log("nexttttt");
      setEnrollStep(2);
    }
    //setEnrollStep(2);
  };

  const validationSchema = Yup.object().shape({
    addressLine1: Yup.string().required("Address Line 1 is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string()
      .required("Zip code is required")
      .matches(/^\d{5}(-\d{4})?$/, "Invalid zip code"),
    shippingState: Yup.lazy(() => {
      if (showShippingAddress) {
        return Yup.string().required("State is required");
      }
      return Yup.mixed().notRequired();
    }),
    shippingCity: Yup.lazy(() => {
      if (showShippingAddress) {
        return Yup.string()
          .required("City is required")
          .matches(/^(?=.*[a-z])[a-z\d\-_\s]+$/i, "City is invalid");
      }
      return Yup.mixed().notRequired();
    }),
    shippingAddressLine1: Yup.lazy(() => {
      if (showShippingAddress) {
        return Yup.string()
          .required("Address Line 1 is required")
          .max(40, "Address Line 1 should not exceed 40 characters")
          .matches(/^[a-z\d\-_\s]+$/i, "Address Line 1 is invalid");
      }
      return Yup.mixed().notRequired();
    }),
    shippingAddressLine2: Yup.lazy(() => {
      if (showShippingAddress) {
        return Yup.string()
          .max(40, "Address Line 2 should not exceed 40 characters")
          .matches(/^[a-z\d\-_\s]+$/i, "Address Line 2 is invalid");
      }
      return Yup.mixed().notRequired();
    }),
    shippingZip: Yup.lazy(() => {
      if (showShippingAddress) {
        return Yup.string()
          .required("ZipCode is required")
          .matches(/^\d{5}$/g, "Invalid Zip")
          .max(99999, "Invalid Zip")
          .typeError("Please Specify a Number");
      }
      return Yup.mixed().notRequired();
    }),
  });

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
                  shippingAddressLine1: "",
                  shippingAddressLine2: "",
                  shippingCity: "",
                  shippingState: "",
                  shippingZip: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                {({ values, errors, touched, setFieldValue }) => (
                  <Form className="space-y-4">
                    <div className="flex flex-col gap-5">
                      <div>
                        <div>
                          <h1 className="text-lg flex flex-row justify-center items-center m-3 font-bold text-blue-900">
                            Primary Address
                          </h1>
                        </div>
                        <div className="flex flex-col md:flex-row md:space-x-4">
                          <div className="flex flex-col w-full">
                            <label htmlFor="addressLine1">
                              Address Line 1*
                            </label>
                            <Field
                              type="text"
                              id="addressLine1"
                              name="addressLine1"
                              className="py-3 px-4 block w-full border solid border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
                              className="py-3 px-4 block w-full border solid border-black-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-white-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
                            <label htmlFor="city">City*</label>
                            <Field
                              type="text"
                              id="city"
                              name="city"
                              className="py-3 px-4 block w-full border solid border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                          <div className="flex flex-col w-full">
                            <label htmlFor="state">State*</label>
                            <Field
                              as="select"
                              id="state"
                              name="state"
                              className="py-3 px-4 block w-full border solid border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
                            <label htmlFor="zip">Zip*</label>
                            <Field
                              type="text"
                              id="zip"
                              name="zip"
                              className="py-3 px-4 block w-full border solid border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            />
                            <ErrorMessage
                              name="zip"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <Field
                            type="checkbox"
                            id="useShippingAddress"
                            name="useShippingAddress"
                            className="h-4 w-4 text-blue-500"
                            onClick={() => {
                              setShowShippingAddress(!showShippingAddress);
                              setAddressErrorMessage("");
                              setFieldValue("shippingState", "");
                              setFieldValue("shippingZip", "");
                              setFieldValue("shippingAddressLine1", "");
                              setFieldValue("shippingAddressLine2", "");
                              setFieldValue("shippingCity", "");
                              setSuggestedAddresses([]);
                            }}
                          />
                          <label
                            htmlFor="useShippingAddress"
                            className="text-sm"
                          >
                            Use Shipping address than primary
                          </label>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div>
                        {showShippingAddress && (
                          <div>
                            <h1 className="text-lg flex flex-row justify-center items-center m-3 font-bold text-blue-900">
                              Shipping Address
                            </h1>
                          </div>
                        )}
                        {showShippingAddress && (
                          <div>
                            <div className="flex flex-col md:flex-row md:space-x-4">
                              <div className="flex flex-col w-full">
                                <label htmlFor="shippingAddressLine1">
                                  Address Line 1*
                                </label>
                                <Field
                                  type="text"
                                  id="shippingAddressLine1"
                                  name="shippingAddressLine1"
                                  className="py-3 px-4 block w-full border solid border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                />
                                <ErrorMessage
                                  name="shippingAddressLine1"
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </div>
                              <div className="flex flex-col w-full">
                                <label htmlFor="shippingAddressLine2">
                                  Address Line 2
                                </label>
                                <Field
                                  type="text"
                                  id="shippingAddressLine2"
                                  name="shippingAddressLine2"
                                  className="py-3 px-4 block w-full border solid border-black-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-white-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                />
                                <ErrorMessage
                                  name="shippingAddressLine2"
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:space-x-4">
                              <div className="flex flex-col w-full">
                                <label htmlFor="shippingCity">City*</label>
                                <Field
                                  type="text"
                                  id="shippingCity"
                                  name="shippingCity"
                                  className="py-3 px-4 block w-full border solid border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                />
                                <ErrorMessage
                                  name="shippingCity"
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </div>
                              <div className="flex flex-col w-full">
                                <label htmlFor="shippingState">State*</label>
                                <Field
                                  as="select"
                                  id="shippingState"
                                  name="shippingState"
                                  className="py-3 px-4 block w-full border solid border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                >
                                  <option value="">Select State</option>
                                  <option value="NY">New York</option>
                                  <option value="CA">California</option>
                                  <option value="TX">Texas</option>
                                </Field>
                                <ErrorMessage
                                  name="shippingState"
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </div>
                              <div className="flex flex-col w-full">
                                <label htmlFor="shippingZip">Zip*</label>
                                <Field
                                  type="text"
                                  id="shippingZip"
                                  name="shippingZip"
                                  className="py-3 px-4 block w-full border solid border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                />
                                <ErrorMessage
                                  name="shippingZip"
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {addressErrorMessage && addressErrorMessage !== "" && (
                        <div>
                          <p className="flex justify-center font-sm text-red-500">
                            {addressErrorMessage}
                          </p>
                        </div>
                      )}

                      {suggestedAddresses && suggestedAddresses.length > 0 && (
                        <div className="flex flex-col gap-4 ">
                          <div className="text dark:bg-slate-400 p-2 border-1 rounded-sm solid border-black-800">
                            We have a suggestion for the{" "}
                            {showShippingAddress ? "shipping" : "primary"}{" "}
                            address you entered. If correct, please choose the
                            suggested address to ensure accurate delivery.
                          </div>
                          <div>
                            <div class="grid sm:grid-cols-2 gap-2">
                              <label
                                for="hs-radio-in-form-enter"
                                class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500  dark:border-gray-700 dark:text-gray-400"
                              >
                                <input
                                  type="radio"
                                  name="hs-radio-in-form"
                                  class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-radio-in-form-enter"
                                />
                                <span
                                  class="text-sm text-gray-500 ms-3 dark:text-gray-400"
                                  onClick={() =>
                                    //setFinalAddress(enteredAddress)
                                    {
                                      setWhichAddress("enteredAddress");
                                    }
                                  }
                                >
                                  <div className="font-medium text-black">
                                    Address entered
                                  </div>
                                  <div>
                                    {`${enteredAddress.address.addressLine1}`}
                                  </div>
                                  {`
                                  ${enteredAddress?.address?.addressLine2}
                                  ${enteredAddress.address.city},
                                 ${enteredAddress.address.state}
                                  ${enteredAddress.address.zip}`}
                                </span>
                              </label>

                              {/* Suggested Address RadioBox */}
                              {suggestedAddresses &&
                                suggestedAddresses.length > 0 &&
                                suggestedAddresses.map((suggested, index) => {
                                  return (
                                    <label
                                      for="hs-radio-in-form-sugg"
                                      class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500  dark:border-gray-700 dark:text-gray-400"
                                    >
                                      <input
                                        type="radio"
                                        name="hs-radio-in-form"
                                        class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                        id="hs-radio-in-form-sugg"
                                      />
                                      <span
                                        class="text-sm text-gray-500 ms-3 dark:text-gray-400"
                                        onClick={() => {
                                          setWhichSuggestedAddress(index);
                                          setWhichAddress("suggestedAddress");
                                        }}
                                      >
                                        <div className="font-medium text-black">
                                          Address Suggested
                                        </div>
                                        <div>{`${suggested?.AddressKeyFormat?.AddressLine}`}</div>
                                        {`
                                  ${suggested?.AddressKeyFormat?.Region}`}
                                      </span>
                                    </label>
                                  );
                                })}
                            </div>
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
