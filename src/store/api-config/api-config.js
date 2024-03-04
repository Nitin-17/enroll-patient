const baseUrl = process.env.REACT_APP_API_URL;
const suffixUrl = process.env.REACT_APP_API_URL_SUFFIX;

const API = {
  getDoctorLocationList: `https://vitalsight-common-qa.ohiomron.com/qa/v2/doctor/doctor-location-list`,
};

export default API;
