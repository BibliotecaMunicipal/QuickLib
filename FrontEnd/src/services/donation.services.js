import axios from "axios";


const URL_API = "https://quicklib-ugh1.onrender.com/api";

export const getDonations = async (token) => {
    return axios.get(`${URL_API}/getAllBook/donation`, { headers: { Authorization: token}})
}

export const altDonation = async (id) => {
    return axios.post(`${URL_API}/addBook/donation/${id}`)
}
