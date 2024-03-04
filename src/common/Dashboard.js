import React, { useState } from "react";
import API from "../store/api-config/api-config";
import { UseSelector, UseDispatch, useDispatch } from "react-redux";
import {
  fetchData,
  getDoctorLocationList,
} from "../store/actions/enrollPatientAction";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const fetchDoctorLocationDetails = () => {
    dispatch(fetchData);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <button
        className="w-32 rounded-full bg-cyan-400 border-2 p-3 text-sm justify-center"
        onClick={fetchDoctorLocationDetails}
      >
        Enroll Patient
      </button>
    </div>
  );
};

export default Dashboard;
