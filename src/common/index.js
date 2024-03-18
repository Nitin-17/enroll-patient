import React, { useState, useEffect } from "react";
import DoctorLocation from "./DoctorLocation";
import PatientDetails from "./PatientDetails";
import { useSelector } from "react-redux";
import PatientAddress from "./PatientAddress";
import PatientDevices from "./PatientDevices";
import PatientThresholds from "./PatientThresholds";
import EditDetails from "./EditDetails";

const EnrollPatient = ({ isClicked, setIsClicked, icd10Codes }) => {
  const [patientData, setPatientData] = useState({});
  const [enrollStep, setEnrollStep] = useState(4);
  const [doctorData, setDoctorData] = useState([]);
  const [icdCodeData, setIcdCodeData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const { doctorLocationList } = useSelector((state) => state?.doctorData);
  //const { icdCodes } = useSelector((state) => state?.doctorData);
  const { hospitalFeatures } = useSelector((state) => state?.doctorData);

  useEffect(() => {
    if (doctorLocationList && doctorLocationList?.data?.length > 0) {
      setModalOpen(true);
      setDoctorData(doctorLocationList?.data);
    }

    if (icd10Codes?.codes && icd10Codes.codes.length > 0) {
      console.log("index", icd10Codes.codes.length);
      setIcdCodeData(icd10Codes);
    }
  }, [doctorLocationList, icd10Codes, hospitalFeatures]);

  return (
    <>
      {enrollStep === 0 && (
        <DoctorLocation
          enrollStep={enrollStep}
          setEnrollStep={setEnrollStep}
          isClicked={isClicked}
          patientData={patientData}
          icdCodeData={icdCodeData}
        />
      )}
      {enrollStep === 1 && (
        <PatientDetails
          enrollStep={enrollStep}
          setEnrollStep={setEnrollStep}
          isClicked={isClicked}
          patientData={patientData}
          icdCodeData={icdCodeData}
        />
      )}

      {enrollStep === 2 && (
        <PatientAddress
          enrollStep={enrollStep}
          setEnrollStep={setEnrollStep}
          isClicked={isClicked}
          icdCodeData={icdCodeData}
        />
      )}

      {enrollStep === 3 && (
        <PatientDevices
          enrollStep={enrollStep}
          setEnrollStep={setEnrollStep}
          isClicked={isClicked}
          hospitalData={hospitalFeatures.data}
        />
      )}

      {enrollStep === 4 && (
        <PatientThresholds
          enrollStep={enrollStep}
          setEnrollStep={setEnrollStep}
          isClicked={isClicked}
          hospitalData={hospitalFeatures.data}
        />
      )}

      {enrollStep === 5 && (
        <EditDetails
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
