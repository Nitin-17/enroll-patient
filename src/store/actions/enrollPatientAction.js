import client from "../../helper/axios";
import API from "../api-config/api-config";
import { addDoctorLocationData } from "../reducers/enrollPatientReducer";
import axios from "axios";
import { UseDispatch } from "react-redux";

/* export const getDoctorLocationList = (dispatch) => {
  return client
    .get(API.getDoctorLocationList)
    .then((response) => {
      if (response && response.data && response.data.success) {
        dispatch(addDoctorLocationData(response.data));
      }
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}; */
export const fetchData = async (dispatch) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    console.log("accessToken is", accessToken);
    if (!accessToken) {
      console.error("Access token not found in localStorage");
      return;
    }

    const headers = {
      Authorization: `${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    return client
      .get(
        "https://vitalsight-common-qa.ohiomron.com/qa/v2/doctor/doctor-location-list",
        { headers }
      )
      .then((response) => {
        if (response && response.data && response.data.success) {
          dispatch(addDoctorLocationData(response.data));
        }
        return response.data;
      })
      .catch((error) => {
        throw error;
      });

    //console.log(response.data);
    // Process response data here
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
