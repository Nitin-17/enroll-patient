import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addPatientDevice } from "../store/reducers/enrollPatientReducer";
import "../css/ReactSelect.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "../css/Tooltip.css";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const PatientDevices = ({ hospitalData, setEnrollStep, enrollStep }) => {
  const { patientEnrollDetails } = useSelector((state) => state?.doctorData);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBpDevice, setSelectedBpDevice] = useState(
    patientEnrollDetails?.patientDevice?.bpDevice || null
  );
  const [selectedWeightDevice, setSelectedWeightDevice] = useState(
    patientEnrollDetails?.patientDevice?.weightDevice || null
  );
  const [cuffSize, setCuffSize] = useState(
    patientEnrollDetails?.patientDevice?.bpDevice || "Small"
  );
  const [weightDevice, setWeightDevice] = useState(
    patientEnrollDetails?.patientDevice?.weightDevice || "Small"
  );
  const [errorMessage, setErrorMessage] = useState(false);
  const [isBpChecked, setIsBpChecked] = useState(
    patientEnrollDetails?.patientDevice?.bpChecked || false
  );
  const [isWeightChecked, setIsWeightChecked] = useState(
    patientEnrollDetails?.patientDevice?.weightChecked || false
  );
  const [supportedDevices, setSupportedDevices] = useState([]);
  const dispatch = useDispatch();
  console.log("devices details", patientEnrollDetails);

  useEffect(() => {
    if (hospitalData && hospitalData?.supportedDevices?.length > 0) {
      setSupportedDevices(hospitalData.supportedDevices);
      setModalOpen(true);
    }
  }, [hospitalData]);

  const toggleBPDevice = () => {
    if (isBpChecked) {
      setSelectedBpDevice("");
    } else {
      setSelectedBpDevice("Small");
      setErrorMessage(false);
    }
    setIsBpChecked(!isBpChecked);
  };

  const toggleWeightDevice = () => {
    if (isWeightChecked) {
      setSelectedWeightDevice("");
    } else {
      setSelectedWeightDevice("Small");
      setErrorMessage(false);
    }
    setIsWeightChecked(!isWeightChecked);
  };

  const handleCuffSizeChange = (event) => {
    console.log("Cuff Size", event.target.value);
    setCuffSize(event.target.value);
    setSelectedBpDevice(event.target.value);
  };

  const handleWeightChange = (event) => {
    console.log("Weight Size", event.target.value);

    setWeightDevice(event.target.value);
    setSelectedWeightDevice(event.target.value);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleNextPage = async (validateForm) => {
    console.log("validate");
    //const errors = await validateForm();
    /*    if (!Object.keys(errors).length) {
      setCurrentPage(currentPage + 1);
    } */
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const validationSchema = () => {};

  const handleSubmit = () => {
    if (isBpChecked || isWeightChecked) {
      let values = {
        bpChecked: isBpChecked,
        bpDevice: isBpChecked ? selectedBpDevice : "",
        weightChecked: isWeightChecked,
        weightDevice: isWeightChecked ? selectedWeightDevice : "",
      };
      //setParams(values);
      console.log("params", values);
      dispatch(addPatientDevice(values));
      setEnrollStep(4);
    } else {
      //alert("Select at least one device");
      setErrorMessage(true);
    }
  };

  return (
    <>
      {modalOpen && enrollStep === 3 && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative bg-white rounded-lg p-4 w-9/12 mx-auto">
              <div className="flex flex-col gap-4 bg-[#f6f9fd] p-2 rounded-lg pl-8 pr-8">
                <div className=" flex flex-row justify-between">
                  <Link to="#" onClick={() => setEnrollStep(2)}>
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
                <div className="container mx-auto px-4 py-2 flex flex-col gap-4">
                  <h1 className="text-center text-xl font-medium mb-8">
                    Select Devices
                  </h1>

                  {/* BP Device Selection */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="blood-pressure-monitor"
                        name="device"
                        value="blood-pressure-monitor"
                        checked={isBpChecked}
                        onChange={() => toggleBPDevice()}
                        className="mr-2 w-5 h-5 accent-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="blood-pressure-monitor"
                        className="text-sm font-medium"
                      >
                        Blood Pressure Monitor
                      </label>
                    </div>

                    <div className="flex flex-row items-center justify-between mt-4 w-9/12">
                      {supportedDevices &&
                        supportedDevices.length > 0 &&
                        supportedDevices.find(
                          (i) => i.device === "bp" && i.size === "small"
                        ) && (
                          <div className="flex items-center justify-center">
                            <input
                              type="radio"
                              id="regular-cuff"
                              name="cuff-size"
                              value="Small"
                              checked={cuffSize === "Small"}
                              onChange={handleCuffSizeChange}
                              disabled={!isBpChecked}
                              className="mr-2 w-5 h-5 accent-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            />
                            <label
                              htmlFor="regular-cuff"
                              className="text-xs flex flex-col gap-1"
                            >
                              <div className="flex flex-row gap-2 items-center">
                                <h1 className="font-medium">Regular Cuff</h1>
                                <div class="tooltip">
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    className="text-blue-500 cursor-pointer"
                                    id="tooltip-right"
                                    role="tooltip"
                                  />
                                  <span class="tooltiptext">
                                    <h1>Regular Cuff</h1>
                                    <p>
                                      BP-7250: Comes with a standard sized adult
                                      BP cuff; preferred for arm circumferences
                                      up to 17”.
                                    </p>
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs">9" to 17" /22 to 42cm</p>
                            </label>
                          </div>
                        )}
                      {supportedDevices &&
                        supportedDevices.length > 0 &&
                        supportedDevices.find(
                          (i) => i.device === "bp" && i.size === "large"
                        ) && (
                          <div className="flex items-center justify-center">
                            <input
                              type="radio"
                              id="large-cuff"
                              name="cuff-size"
                              value="Large"
                              checked={cuffSize === "Large"}
                              disabled={!isBpChecked}
                              onChange={handleCuffSizeChange}
                              className="mr-2 w-5 h-5 accent-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            />
                            <label
                              htmlFor="large-cuff"
                              className="text-xs flex flex-col gap-1"
                            >
                              <div className="flex flex-row gap-2 items-center">
                                <h1 className="font-medium">Large Cuff</h1>
                                <div class="tooltip">
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    className="text-blue-500 cursor-pointer"
                                    id="tooltip-right"
                                    role="tooltip"
                                  />
                                  <span class="tooltiptext">
                                    <h1>Large Cuff</h1>
                                    <p>
                                      HEM-9210: For patients with an arm
                                      circumference between 17”-20”.
                                    </p>
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs">17" to 20" / 42 to 50cm</p>
                            </label>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Weight Device Selection */}
                  <div className="flex flex-col space-y-4 mt-5">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="weight-scale"
                        name="device"
                        value="weight-scale"
                        checked={isWeightChecked}
                        onChange={() => toggleWeightDevice()}
                        className="mr-2 w-5 h-5 accent-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="weight-scale"
                        className="text-sm font-medium"
                      >
                        Weight Scale
                      </label>
                    </div>

                    <div className="flex flex-row items-center justify-between mt-4 w-9/12 gap-4">
                      {supportedDevices &&
                        supportedDevices.length > 0 &&
                        supportedDevices.find(
                          (i) => i.device === "weight" && i.size === "small"
                        ) && (
                          <div className="flex items-center justify-center">
                            <input
                              type="radio"
                              id="regular-weight"
                              name="weight-scale"
                              value="Small"
                              checked={weightDevice === "Small"}
                              onChange={handleWeightChange}
                              disabled={!isWeightChecked}
                              className="mr-2 w-5 h-5 accent-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            />
                            <label
                              htmlFor="regular-weight"
                              className="text-xs flex flex-col gap-1"
                            >
                              <div className="flex flex-row gap-2 items-center">
                                <h1 className="font-medium">Regular</h1>
                                <div class="tooltip">
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    className="text-blue-500 cursor-pointer"
                                    id="tooltip-right"
                                    role="tooltip"
                                  />
                                  <span class="tooltiptext">
                                    <h1>Regular</h1>
                                    <p>
                                      BCM-500: Preferred scale for patients
                                      unlikely to weigh in excess of 325 lbs.
                                      Body composition function may interfere
                                      with pacemaker, making the Large scale
                                      more suitable.
                                    </p>
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs">
                                5 - 297 lbs / 2 - 135 kgs
                              </p>
                            </label>
                          </div>
                        )}
                      {supportedDevices &&
                        supportedDevices.length > 0 &&
                        supportedDevices.find(
                          (i) => i.device === "weight" && i.size === "large"
                        ) && (
                          <div className="flex items-center justify-center">
                            <input
                              type="radio"
                              id="large-weight"
                              name="weight-size"
                              value="Large"
                              checked={weightDevice === "Large"}
                              disabled={!isWeightChecked}
                              onChange={handleWeightChange}
                              className="mr-2 w-5 h-5 accent-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            />
                            <label
                              htmlFor="large-weight"
                              className="text-xs flex flex-col gap-1"
                            >
                              <div className="flex flex-row gap-2 items-center">
                                <h1 className="font-medium">Extra Large</h1>
                                <div class="tooltip">
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                    className="text-blue-500 cursor-pointer"
                                    id="tooltip-right"
                                    role="tooltip"
                                  />
                                  <span class="tooltiptext">
                                    <h1>Extra Large</h1>
                                    <p>
                                      HN-290T: 550lb max. For patients with a
                                      pacemaker or who are likely to weigh more
                                      than 350 lbs, but unlikely to exceed 550
                                      lbs.
                                    </p>
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs">
                                11 - 550 lbs / 5 - 250 kgs
                              </p>
                            </label>
                          </div>
                        )}
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="text-red-500 text-sm mt-6 flex flex-row justify-center items-center">
                      <p>
                        Please select either Blood Pressure Monitor or Weight
                        Scale
                      </p>
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
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-72 rounded-lg bg-[#0e55aa] hover:bg-[#05346c] border-2 pt-2.5 pb-2.5 text-sm justify-center text-white font-[450]"
                    >
                      Next : Patient Thresholds
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientDevices;
