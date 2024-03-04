import client from "../../helper/axios";
import API from "../api-config/api-config";
import { addDoctorLocationData } from "../reducers/enrollPatientReducer";

export const getDoctorLocationList = (dispatch) => {
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
};
