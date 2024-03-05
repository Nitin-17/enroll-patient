import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctorData } from "../store/reducers/enrollPatientReducer";
import Loader from "../helper/Loader";
import Modal from "../helper/Modal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { doctorLocationList, error } = useSelector(
    (state) => state?.doctorData
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchDoctorLocationDetails = () => {
    setIsLoading(true);
    dispatch(fetchDoctorData()).then((response) => {
      console.log("success");
      setIsLoading(false);
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
      <Modal />
      {error && <p>Error: {error}</p>}{" "}
      {/* Render error message if error exists */}
    </div>
  );
};

export default Dashboard;
