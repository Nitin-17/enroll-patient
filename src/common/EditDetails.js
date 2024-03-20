import React, { useState } from "react";
import { Modal, Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../store/reducers/enrollPatientReducer";
import { verifyAddressAction } from "../store/actions/enrollPatientAction";

const EditDetails = ({ enrollStep, isClicked, setEnrollStep }) => {
  const [modalOpen, setModalOpen] = useState(true);
  const { patientEnrollDetails } = useSelector((state) => state?.doctorData);

  console.log("patientFullDetails", patientEnrollDetails);

  //const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values);
    console.log("clicked on next");

    //setEnrollStep(3);
  };

  const handleClose = () => {
    setModalOpen(false);
    //onClose();
  };

  const handleEditDetails = () => {
    setEnrollStep(3);
  };

  return (
    <>
      {modalOpen && enrollStep === 5 && isClicked && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative bg-white rounded-lg p-8 w-9/12 mx-auto">
              <div className="flex flex-col gap-4 bg-[#f6f9fd] p-2 rounded-lg pl-8 pr-8">
                <div className="flex flex-col justify-center items-center gap-1">
                  <h2 className="text-xl font-bold">Enroll New Patient</h2>
                  <p className="text-sm">Patient Details</p>
                  <button
                    type="button"
                    className="w-24 rounded-lg bg-[#0e55aa] hover:bg-[#05346c] border-2 pt-2.5 pb-2.5 text-sm justify-center text-white font-[450]"
                    onClick={handleEditDetails}
                  >
                    Edit Details
                  </button>
                </div>
                <div className="flex flex-row justify-start rounded-lg p-8 gap-12 text-sm">
                  {/* First Col Name, Email, consent, contact, gender, MRN, ICD-10, Devices, Weight Gain Department*/}
                  <div className="flex flex-col gap-6">
                    <div className="w-fit flex flex-col gap-0">
                      <label className="block text-gray-700 font-medium mb-2">
                        Patient Name
                      </label>
                      <p className="text-gray-700">
                        {patientEnrollDetails.patientDetails.firstName +
                          " " +
                          patientEnrollDetails.patientDetails.lastName}
                      </p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-medium mb-2">
                        Patient Email
                      </label>
                      <p className="text-gray-700">
                        {patientEnrollDetails.patientDetails.patientEmail}
                      </p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-medium mb-2">
                        Doest Patient Needs to be consent?
                      </label>
                      <p className="text-gray-700">
                        {patientEnrollDetails.patientDetails.consent}
                      </p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-medium mb-2">
                        Contact Via
                      </label>
                      <p className="text-gray-700">
                        {/* {patientEnrollDetails.patientDetails.contactVai.phone
                          ? "Phone"
                          : ""} */}

                        {/*  {patientEnrollDetails.patientDetails.contactVai.email
                          ? "Email"
                          : ""} */}
                      </p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-medium mb-2">
                        Gender
                      </label>
                      <p className="text-gray-700">
                        {patientEnrollDetails.patientDetails.gender}
                      </p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-medium mb-2">
                        Patient MRN
                      </label>
                      <p className="text-gray-700">
                        {patientEnrollDetails.patientDetails.patientMRN}
                      </p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-medium mb-2">
                        ICD COde
                      </label>
                      <p className="text-gray-700">ICD-1</p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-medium mb-2">
                        Devices
                      </label>
                      <p className="text-gray-700">BP</p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-medium mb-2">
                        Department
                      </label>
                      <p className="text-gray-700">Cardiology</p>
                    </div>
                  </div>

                  {/* Date of Birth, Mobile Phone Number, Address, BP Single, BP average, Location */}
                  <div className="flex flex-col justify-start rounded-lg gap-10 text-sm">
                    <div className="w-fit">
                      <label className="block text-gray-700 font-medium mb-2">
                        Date of Birth
                      </label>
                      <p className="text-gray-700">
                        {patientEnrollDetails.patientDetails.dob}
                      </p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-medium mb-2">
                        Mobile Phone Number
                      </label>
                      <p className="text-gray-700">
                        {patientEnrollDetails.patientDetails.countryCode}
                        {patientEnrollDetails.patientDetails.mobilePhone}
                      </p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-medium mb-2">
                        Address
                      </label>
                      <p className="text-gray-700">
                        {patientEnrollDetails.patientAddress.addressLine1},
                        {patientEnrollDetails.patientAddress.city},
                      </p>

                      <p className="text-gray-700">
                        {patientEnrollDetails.patientAddress.zip}
                      </p>
                    </div>

                    {patientEnrollDetails &&
                      patientEnrollDetails?.patientThresholds.length > 0 && (
                        <>
                          <div className="w-fit">
                            <label className="block text-gray-700 font-medium mb-2">
                              Blood Pressure Thresholds
                              <p className="text-xs">(Single Reading)</p>
                            </label>
                            <div>
                              <p className="text-gray-700">
                                Sys High (mmHg) :{" "}
                                {
                                  patientEnrollDetails?.patientThresholds[0]
                                    ?.sysUpperLimit
                                }
                              </p>
                              <p className="text-gray-700">
                                Sys Lower (mmHg) :{" "}
                                {
                                  patientEnrollDetails?.patientThresholds[0]
                                    ?.sysLowerLimit
                                }
                              </p>
                              <p className="text-gray-700">
                                Dia High (mmHg) :{" "}
                                {
                                  patientEnrollDetails?.patientThresholds[0]
                                    ?.diaUpperLimit
                                }
                              </p>
                              <p className="text-gray-700">
                                Dia Lower (mmHg) :{" "}
                                {
                                  patientEnrollDetails?.patientThresholds[0]
                                    ?.diaLowerLimit
                                }
                              </p>
                            </div>
                          </div>

                          <div className="w-fit">
                            <label className="block text-gray-700 font-medium mb-2">
                              Blood Pressure Thresholds
                            </label>
                            <div>
                              <p className="text-gray-700">
                                Sys High (mmHg) :{" "}
                                {
                                  patientEnrollDetails?.patientThresholds[0]
                                    ?.sysUpperAverage
                                }
                              </p>
                              <p className="text-gray-700">
                                Sys Lower (mmHg) :{" "}
                                {
                                  patientEnrollDetails?.patientThresholds[0]
                                    ?.sysLowerAverage
                                }
                              </p>
                              <p className="text-gray-700">
                                Dia High (mmHg) :{" "}
                                {
                                  patientEnrollDetails?.patientThresholds[0]
                                    ?.diaUpperAverage
                                }
                              </p>
                              <p className="text-gray-700">
                                Dia Lower (mmHg) :{" "}
                                {
                                  patientEnrollDetails?.patientThresholds[0]
                                    ?.diaLowerAverage
                                }
                              </p>
                            </div>
                          </div>
                        </>
                      )}

                    <div className="w-fit">
                      <label className="block text-gray-700 font-medium mb-2">
                        Location
                      </label>
                      <p className="text-gray-700">Location</p>
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
                    Enroll Patient
                  </button>
                </div>
                <div>
                  <span className="text-sm">
                    By enrolling this patient, I agree to the{" "}
                    <a
                      href="https://store.digitalriver.com/store/defaults/en_US/DisplayDRTermsAndConditionsPage/eCommerceProvider.DR%20globalTech%20Inc"
                      className="text-[#0e55aa] underline underline-offset-4"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms of Sale
                    </a>{" "}
                    and the{" "}
                    <a
                      href="https://store.digitalriver.com/store/defaults/en_US/DisplayDRPrivacyPolicyPage/eCommerceProvider.Digital%20River%20Inc"
                      className="text-[#0e55aa] underline underline-offset-4"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Privacy Policy
                    </a>{" "}
                    of DR globalTech, Inc. You expressly authorize and permit
                    Digital River to automatically bill your payment method on
                    file on a monthly basis based on usage, as originally agreed
                    on account creation / program enrollment.
                  </span>
                </div>
              </div>

              {/* Button Group */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDetails;
