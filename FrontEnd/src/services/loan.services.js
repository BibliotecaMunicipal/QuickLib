
import axios from 'axios';

const URL_API = "https://quicklib-ugh1.onrender.com/api";

export const registerLoans = async (loan, token) => {
  return axios.post(`${URL_API}/register/loan`, loan, {
    headers: { Authorization: token }
  });
};

export const getLoans = async (token) => {
  return axios.get(`${URL_API}/getAll/loan`, {
    headers: { Authorization: token }
  });
};

export const returnLoan = async (id) => {
  return axios.post(`${URL_API}/return/loan/${id}`);
};

export const getUserLoan = async (username) => {
  return axios.get(`${URL_API}/getUser/loan/${username}`)
}
