import React, { useState, useEffect } from "react";
import Modal from "../helper/Modal";
import PatientDetails from "./PatientDetails";
import { useSelector } from "react-redux";

const EnrollPatient = () => {
  const [enrollStep, setEnrollStep] = useState(0);
  const [doctorData, setDoctorData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { doctorLocationList, error } = useSelector(
    (state) => state?.doctorData
  );

  useEffect(() => {
    if (doctorLocationList && doctorLocationList?.data?.length > 0) {
      setModalOpen(true);
      setDoctorData(doctorLocationList?.data);
    }
  }, [doctorLocationList]);

  return (
    <>
      {enrollStep === 0 && (
        <PatientDetails enrollStep={enrollStep} setEnrollStep={enrollStep} />
      )}

      {enrollStep === 1 && <Modal />}
    </>
  );
};

export default EnrollPatient;
