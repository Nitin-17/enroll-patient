import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import "../css/ReactSelect.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "../css/Tooltip.css";

const PatientDevices = ({ hospitalData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBpDevice, setSelectedBpDevice] = useState(null);
  const [selectedWeightDevice, setSelectedWeightDevice] = useState(null);
  const [cuffSize, setCuffSize] = useState("Small");
  const [weightDevice, setWeightDevice] = useState("Small");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isBpChecked, setIsBpChecked] = useState(false);
  const [isWeightChecked, setIsWeightChecked] = useState(false);
  const [supportedDevices, setSupportedDevices] = useState([]);
  //const [params, setParams] = useState({});

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
    } else {
      alert("Select at least one device");
      setErrorMessage(true);
    }
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleClose}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative bg-white rounded-lg p-8 w-9/12 mx-auto">
              <div>
                <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                  <h1 className="text-center text-xl font-bold mb-8">
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
                            <label htmlFor="regular-cuff" className="text-sm">
                              <div className="flex flex-row gap-2 items-center">
                                Regular Cuff
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
                            <label htmlFor="large-cuff" className="text-sm">
                              <div className="flex flex-row gap-2 items-center">
                                Large Cuff
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

                    <div className="flex flex-row items-center justify-between mt-4 w-9/12">
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
                            <label htmlFor="regular-weight" className="text-sm">
                              <div className="flex flex-row gap-2 items-center">
                                Regular
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
                            <label htmlFor="large-weight" className="text-sm">
                              <div className="flex flex-row gap-2 items-center">
                                Extra Large
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
                      Next: Patient Details
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
