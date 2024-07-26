import axios from "axios";

const URL_API = "https://quicklib-backend.onrender.com/api";

export const getLoss = async (token) => {
    return axios.get(`${URL_API}/getAllBook/loss`, { headers: { Authorization: token }})
 };

 export const getBookLoss = async () => {
   return axios.get(`${URL_API}/getLoss/book`)
 }

 export const recoverLoss = async (id) => {
    return axios.post(`${URL_API}/recover/loss/${id}`);
 };

export const deleteLoss = async (id) => {
   return axios.delete(`${URL_API}/deleteBook/loss/${id}`)
}
