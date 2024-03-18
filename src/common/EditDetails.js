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
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleClose}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative bg-white rounded-lg p-8 w-9/12 mx-auto">
              <div className="modal-footer p-4">
                <h2 className="text-2xl font-bold mb-4">Patient details</h2>
                <button
                  type="button"
                  className="w-fit rounded-full bg-cyan-400 border-2 p-2 text-sm justify-center"
                  onClick={handleEditDetails}
                >
                  Edit Details
                </button>
                <div className="flex flex-row justify-between bg-white shadow-md rounded-lg p-6">
                  {/* First Col Name, Email, consent, contact, gender, MRN, ICD-10, Devices, Weight Gain Department*/}
                  <div className="flex flex-col">
                    <div className="w-fit">
                      <label className="block text-gray-700 font-bold mb-2">
                        Patient First+Last
                      </label>
                      <p className="text-gray-700">Full Name</p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-bold mb-2">
                        Patient Email
                      </label>
                      <p className="text-gray-700">email JSX</p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-bold mb-2">
                        Doest Patient Needs to be consent?
                      </label>
                      <p className="text-gray-700">consent</p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-bold mb-2">
                        COntact Via
                      </label>
                      <p className="text-gray-700">Text</p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-bold mb-2">
                        Gender
                      </label>
                      <p className="text-gray-700">Male</p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-bold mb-2">
                        Patient MRN
                      </label>
                      <p className="text-gray-700">MRN</p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-bold mb-2">
                        ICD COde
                      </label>
                      <p className="text-gray-700">ICD-1</p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-bold mb-2">
                        Devices
                      </label>
                      <p className="text-gray-700">BP</p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-bold mb-2">
                        Department
                      </label>
                      <p className="text-gray-700">email JSX</p>
                    </div>
                  </div>

                  {/* Date of Birth, Mobile Phone Number, Address, BP Single, BP average, Location */}
                  <div className="flex flex-col">
                    <div className="w-fit">
                      <label className="block text-gray-700 font-bold mb-2">
                        Date of Birth
                      </label>
                      <p className="text-gray-700">Full Name</p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-bold mb-2">
                        Mobile Phone Number
                      </label>
                      <p className="text-gray-700">Mobile Phone</p>
                    </div>

                    <div className="w-fit">
                      <label className="block text-gray-700 font-bold mb-2">
                        Address
                      </label>
                      <p className="text-gray-700">Address</p>
                    </div>

                    {patientEnrollDetails &&
                      patientEnrollDetails?.patientThresholds.length > 0 && (
                        <>
                          <div className="w-fit">
                            <label className="block text-gray-700 font-bold mb-2">
                              PP SIngle
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
                            <label className="block text-gray-700 font-bold mb-2">
                              PP Average
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
                      <label className="block text-gray-700 font-bold mb-2">
                        Location
                      </label>
                      <p className="text-gray-700">Location</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button Group */}
              <div>
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
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDetails;
