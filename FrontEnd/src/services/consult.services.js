
import axios from 'axios';

const URL_API = "https://quicklib-ugh1.onrender.com/api";

export const registerConsult = async (consult) => {
  return axios.post(`${URL_API}/register/consult`, consult);
};

export const getStatistics = async () => {
  return axios.get(`${URL_API}/statistics`);
}
