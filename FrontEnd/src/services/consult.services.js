
import axios from 'axios';

const URL_API = "http://localhost:3000/api";

export const registerConsult = async (consult) => {
  return axios.post(`${URL_API}/register/consult`, consult);
};

export const getStatistics = async () => {
  return axios.get(`${URL_API}/statistics`);
}