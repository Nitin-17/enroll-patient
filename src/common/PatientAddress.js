import React, { useState } from "react";
import { Modal, Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../store/reducers/enrollPatientReducer";
import { verifyAddressAction } from "../store/actions/enrollPatientAction";
import { addPatientAddress } from "../store/reducers/enrollPatientReducer";
import { states } from "../helper/usaStates";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PatientAddress = ({ enrollStep, isClicked, setEnrollStep }) => {
  const { patientEnrollDetails } = useSelector((state) => state?.doctorData);
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
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values);
    let addressDetails;
    if (showShippingAddress) {
      console.log("values shipping", values);

      addressDetails = {
        addressLine1: values.shippingAddressLine1,
        addressLine2: values.shippingAddressLine2
          ? values.shippingAddressLine2
          : "",
        city: values.shippingCity,
        countryCode: "US",
        state: values.shippingState,
        zip: values.shippingZip,
      };

      //setParams(shippingAdressDetails);
    } else {
      addressDetails = {
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2 ? values.addressLine2 : "",
        city: values.city,
        countryCode: "US",
        state: values.state,
        zip: values.zip,
      };
    }
    setAddressErrorMessage("");
    setSuggestedAddresses("");
    if (whichAddress === "") {
      setIsLoading(true);
      const response = dispatch(
        verifyAddressAction({ address: addressDetails })
      );
      response
        .then((response) => {
          if (response.success) {
            setaddressReceived(true);
            setSuggestedAddresses(response.data.candidate);
            console.log("sugggg", response.data.candidate);
            setEnteredAddress(values);
            console.log("response is", response);
            setIsLoading(false);
            //params.suggestedAddresses = response.data.candidate;
          } else {
            setAddressErrorMessage(response.message);
            console.log(response);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log("error address is", error);
          setIsLoading(false);
        });
    }
    if (whichAddress !== "" && whichAddress === "enteredAddress") {
      console.log("enteres", whichAddress, enteredAddress);
      //setFinalAddress(enteredAddress);
      //console.log("Final Enter Address", finalAddress);
      setSuggestedAddresses([]);

      dispatch(addPatientAddress(enteredAddress));
      setEnrollStep(3);
      setWhichAddress("");
    }
    if (whichAddress !== "" && whichAddress === "suggestedAddress") {
      //setSuggestedAddresses([]);
      console.log("whichSuggestedAddress", whichSuggestedAddress);
      dispatch(
        addPatientAddress({
          suggestedAddress: suggestedAddresses[whichSuggestedAddress],
          enteredAddress: enteredAddress,
          addressReceived: addressReceived,
        })
      );
      setEnrollStep(3);
      setWhichAddress("");
    } else {
      //console.log("Finalll", suggestedAddresses[whichSuggestedAddress]);
      //setSuggestedAddresses([]);
      setWhichAddress("");
      //setShowShippingAddress("");
      //console.log("nexttttt");
      //setEnrollStep(3);
    }
    //setEnrollStep(3);
  };

  const validationSchema = Yup.object().shape({
    addressLine1: Yup.string()
      .required("Address Line 1 is required")
      .max(40, "Address Line 1 should not exceed 40 characters")
      .matches(/^[a-z\d\-_\s]+$/i, "Address Line 1 is invalid"),
    addressLine2: Yup.string()
      .max(40, "Address Line 1 should not exceed 40 characters")
      .matches(/^[a-z\d\-_\s]+$/i, "Address Line 1 is invalid"),
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
      {modalOpen && enrollStep === 2 && isClicked && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-2">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative bg-white rounded-lg p-4 ">
              <Formik
                initialValues={{
                  addressLine1:
                    patientEnrollDetails?.patientAddress?.addressLine1 || "",
                  addressLine2:
                    patientEnrollDetails?.patientAddress?.addressLine2 || "",
                  city: patientEnrollDetails?.patientAddress?.city || "",
                  state: patientEnrollDetails?.patientAddress?.state || "",
                  zip: patientEnrollDetails?.patientAddress?.zip || "",
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
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-4">
                        <h1 className="flex justify-center text-xl font-medium">
                          Patient Address
                        </h1>
                        <p className="text-sm">* indicates a required field</p>
                      </div>
                      <div className="flex flex-col flex-wrap gap-10">
                        <div className="flex flex-row md:flex-row items-center justify-start gap-10 flex-wrap">
                          <div className="flex flex-col">
                            {/* <label htmlFor="addressLine1">
                              Address Line 1*
                            </label> */}
                            <Field
                              type="text"
                              id="addressLine1"
                              name="addressLine1"
                              placeholder="Address Line 1*"
                              className="bg-gray-50 border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              onChange={(e) => {
                                setFieldValue(
                                  "addressLine1",
                                  e.target.value.trimStart()
                                );
                                setWhichAddress("");
                                //setSuggestedAddresses([]);
                              }}
                            />
                            <ErrorMessage
                              name="addressLine1"
                              component="div"
                              className="text-red-500 text-xs absolute mt-10 ml-10 text-center"
                            />
                          </div>
                          <div className="flex flex-col flex-wrap">
                            {/* <label htmlFor="addressLine2">Address Line 2</label> */}
                            <Field
                              type="text"
                              id="addressLine2"
                              name="addressLine2"
                              placeholder="addressLine2"
                              className="bg-gray-50 border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <ErrorMessage
                              name="addressLine2"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row  gap-10">
                          <div className="flex flex-col">
                            {/*  <label htmlFor="city">City*</label> */}
                            <Field
                              type="text"
                              id="city"
                              name="city"
                              placeholder="city*"
                              className="bg-gray-50 border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                          <div className="flex flex-row flex-wrap gap-6">
                            <div className="flex flex-col">
                              {/* <label htmlFor="state">State*</label> */}
                              <Field
                                as="select"
                                id="state"
                                name="state"
                                placeholder="state*"
                                className="bg-gray-50 border text-sm h-11 rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-36 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(event) => {
                                  setFieldValue(
                                    "state",
                                    event.target.value.trim()
                                  );
                                }}
                              >
                                <option value="" defaultValue hidden>
                                  State
                                </option>
                                {states &&
                                  states.map((state, index) => {
                                    return (
                                      <option
                                        key={state.abbreviation}
                                        value={state.abbreviation}
                                      >
                                        {state.name}
                                      </option>
                                    );
                                  })}
                              </Field>
                              <ErrorMessage
                                name="state"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="flex flex-col">
                              {/*  <label htmlFor="zip">Zip*</label> */}
                              <Field
                                type="text"
                                id="zip"
                                name="zip"
                                placeholder="zip*"
                                className="bg-gray-50 border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-28 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                              <ErrorMessage
                                name="zip"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center gap-2">
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
                            Shipping address is different than the primary
                            address
                          </label>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div>
                        {showShippingAddress && (
                          <div>
                            <h1 className="text-lg flex flex-row justify-center items-center m-3 font-medium">
                              Shipping Address
                            </h1>
                          </div>
                        )}
                        {showShippingAddress && (
                          <div className="flex flex-col flex-wrap gap-8 mt-4">
                            <div className="flex flex-row md:flex-row items-center justify-start gap-10 flex-wrap">
                              <div className="flex flex-col">
                                {/* <label htmlFor="shippingAddressLine1">
                                  Address Line 1*
                                </label> */}
                                <Field
                                  type="text"
                                  id="shippingAddressLine1"
                                  name="shippingAddressLine1"
                                  placeholder="Address Line 1*"
                                  className="bg-gray-50 border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <ErrorMessage
                                  name="shippingAddressLine1"
                                  component="div"
                                  className="text-red-500 text-xs absolute mt-10 ml-10 text-center"
                                />
                              </div>
                              <div className="flex flex-col">
                                {/* <label htmlFor="shippingAddressLine2">
                                  Address Line 2
                                </label> */}
                                <Field
                                  type="text"
                                  id="shippingAddressLine2"
                                  name="shippingAddressLine2"
                                  placeholder="Address Line 2"
                                  className="bg-gray-50 border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <ErrorMessage
                                  name="shippingAddressLine2"
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </div>
                            </div>
                            <div className="flex flex-row flex-wrap gap-10">
                              <div className="flex flex-col">
                                {/* <label htmlFor="shippingCity">City*</label> */}
                                <Field
                                  type="text"
                                  id="shippingCity"
                                  name="shippingCity"
                                  placeholder="City*"
                                  className="bg-gray-50 border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-72 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <ErrorMessage
                                  name="shippingCity"
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </div>
                              <div className="flex flex-col">
                                {/* <label htmlFor="shippingState">State*</label> */}
                                <Field
                                  as="select"
                                  id="shippingState"
                                  name="shippingState"
                                  placeholder="State*"
                                  className="bg-gray-50 border text-sm h-11 rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-36 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  onChange={(event) => {
                                    setFieldValue(
                                      "shippingState",
                                      event.target.value.trim()
                                    );
                                  }}
                                >
                                  <option value="" defaultValue hidden>
                                    State
                                  </option>
                                  {states &&
                                    states.map((state, index) => {
                                      return (
                                        <option
                                          key={state.abbreviation}
                                          value={state.abbreviation}
                                        >
                                          {state.name}
                                        </option>
                                      );
                                    })}
                                </Field>
                                <ErrorMessage
                                  name="shippingState"
                                  component="div"
                                  className="text-red-500 text-xs"
                                />
                              </div>
                              <div className="flex flex-col">
                                {/* <label htmlFor="shippingZip">Zip*</label> */}
                                <Field
                                  type="text"
                                  id="shippingZip"
                                  name="shippingZip"
                                  placeholder="Zip*"
                                  className="bg-gray-50 border text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500  w-28 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        <div className="flex flex-col flex-wrap gap-4 w-[600px]">
                          <div className="text dark:bg-slate-400 p-2 border-1 rounded-sm solid border-black-800">
                            We have a suggestion for the{" "}
                            {showShippingAddress ? "shipping" : "primary"}{" "}
                            address you entered. If correct, please choose the
                            suggested address to ensure accurate delivery.
                          </div>

                          <div class="flex flex-row flex-wrap gap-2">
                            <label
                              for="hs-radio-in-form-enter"
                              class="flex p-3 w-64 bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500  dark:border-gray-700 dark:text-gray-400"
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
                                <div>{`${enteredAddress.addressLine1}`}</div>
                                {`
                                  ${enteredAddress?.addressLine2}
                                  ${enteredAddress.city},
                                 ${enteredAddress.state}
                                  ${enteredAddress.zip}`}
                              </span>
                            </label>

                            {/* Suggested Address RadioBox */}
                            {suggestedAddresses &&
                              suggestedAddresses.length > 0 &&
                              suggestedAddresses.map((suggested, index) => {
                                return (
                                  <label
                                    for="hs-radio-in-form-sugg"
                                    class="flex p-3 w-64 bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500  dark:border-gray-700 dark:text-gray-400"
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
                      )}

                      <div className="modal-footer p-4 flex flex-row justify-between">
                        <button
                          className="w-72 rounded-lg bg-[#61636B] hover:bg-[#343a40] border-2 pt-2.5 pb-2.5 text-sm justify-center text-white font-[450]"
                          onClick={handleClose}
                          type="button"
                        >
                          Cancel
                        </button>
                        {/* <button
                          type="submit"
                          className="w-72 rounded-lg bg-[#0e55aa] hover:bg-[#05346c] border-2 pt-2.5 pb-2.5 text-sm justify-center text-white font-[450]"
                        >
                          Next : Order Device
                        </button> */}
                        <button
                          type="submit"
                          className="w-72 rounded-lg bg-[#0e55aa] hover:bg-[#05346c] border-2 pt-2.5 pb-2.5 text-sm justify-center text-white font-[450]"
                          disabled={isLoading} // Disable the button when loading
                        >
                          {isLoading ? (
                            <div className="flex justify-center items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span className="ml-2">Next : Order Device</span>
                            </div>
                          ) : (
                            "Next : Order Device"
                          )}
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
