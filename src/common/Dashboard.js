import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDoctorData,
  fetchIcdCodes,
  getHospitalFeatures,
} from "../store/reducers/enrollPatientReducer";
import Loader from "../helper/Loader";
import Modal from "./DoctorLocation";
import EnrollPatient from "./index";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { doctorLocationList, error } = useSelector(
    (state) => state?.doctorData
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [icd10Codes, setIcd10Codes] = useState({});

  const fetchDoctorLocationDetails = () => {
    setIsLoading(true);
    dispatch(fetchDoctorData()).then((response) => {
      console.log("Called");
      setIsLoading(false);
      setIsClicked(true);
    });
    dispatch(fetchIcdCodes()).then((response) => {
      console.log("Called");
      console.log(response);
      setIcd10Codes(response.payload);
      setIsLoading(false);
      setIsClicked(true);
    });
    dispatch(getHospitalFeatures()).then((response) => {
      console.log("Called");

      setIsLoading(false);
      setIsClicked(true);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <button
        className="w-32 rounded-full bg-cyan-400 border-2 p-3 text-sm justify-center"
        onClick={fetchDoctorLocationDetails}
      >
        Enroll Patient
      </button>
      {isLoading && <Loader />}
      <EnrollPatient
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        icd10Codes={icd10Codes}
      />
      {error && <p>Error: {error}</p>}{" "}
    </div>
  );
};

export default Dashboard;
