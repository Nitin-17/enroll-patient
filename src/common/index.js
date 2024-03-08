import React, { useState, useEffect } from "react";
import Modal from "../helper/Modal";
import PatientDetails from "./PatientDetails";
import { useSelector } from "react-redux";
import PatientAddress from "./PatientAddress";

const EnrollPatient = ({ isClicked, setIsClicked }) => {
  const [enrollStep, setEnrollStep] = useState(0);
  const [doctorData, setDoctorData] = useState([]);
  const [icdCodeData, setIcdCodeData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const { doctorLocationList } = useSelector((state) => state?.doctorData);
  const { icdCodes } = useSelector((state) => state?.doctorData);

  useEffect(() => {
    if (doctorLocationList && doctorLocationList?.data?.length > 0) {
      setModalOpen(true);
      setDoctorData(doctorLocationList?.data);
    }

    console.log("icdCodessssssss", icdCodes);
    if (icdCodes.icdGroups.length > 0) {
      setIcdCodeData(icdCodes.icdGroups);
    }
    /* if (icdCodes && icdCodes?.length > 0) {
    } */
  }, [doctorLocationList, icdCodes]);

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
    </>
  );
};

export default EnrollPatient;
