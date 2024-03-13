import React, { useState, useEffect } from "react";
import Modal from "../helper/Modal";
import PatientDetails from "./PatientDetails";
import { useSelector } from "react-redux";
import PatientAddress from "./PatientAddress";
import PatientDevices from "./PatientDevices";
import PatientThresholds from "./PatientThresholds";

const EnrollPatient = ({ isClicked, setIsClicked }) => {
  const [enrollStep, setEnrollStep] = useState(3);
  const [doctorData, setDoctorData] = useState([]);
  const [icdCodeData, setIcdCodeData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const { doctorLocationList } = useSelector((state) => state?.doctorData);
  const { icdCodes } = useSelector((state) => state?.doctorData);
  const { hospitalFeatures } = useSelector((state) => state?.doctorData);

  useEffect(() => {
    if (doctorLocationList && doctorLocationList?.data?.length > 0) {
      setModalOpen(true);
      setDoctorData(doctorLocationList?.data);
    }

    if (icdCodes.icdGroups.length > 0) {
      setIcdCodeData(icdCodes.icdGroups);
    }
  }, [doctorLocationList, icdCodes, hospitalFeatures]);

  return (
    <>
      {enrollStep === 0 && (
        <PatientDetails
          enrollStep={enrollStep}
          setEnrollStep={setEnrollStep}
          isClicked={isClicked}
        />
      )}

      {enrollStep === 1 && (
        <PatientAddress
          enrollStep={enrollStep}
          setEnrollStep={setEnrollStep}
          isClicked={isClicked}
          icdCodeData={icdCodeData}
        />
      )}

      {enrollStep === 2 && (
        <PatientDevices
          enrollStep={enrollStep}
          setEnrollStep={setEnrollStep}
          isClicked={isClicked}
          hospitalData={hospitalFeatures.data}
        />
      )}

      {enrollStep === 3 && (
        <PatientThresholds
          enrollStep={enrollStep}
          setEnrollStep={setEnrollStep}
          isClicked={isClicked}
          hospitalData={hospitalFeatures.data}
        />
      )}
    </>
  );
};

export default EnrollPatient;
