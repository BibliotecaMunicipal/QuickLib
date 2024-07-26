import axios from "axios";

const URL_API = "https://quicklib-backend.onrender.com/api";

export const getAllCategory = async () => {
    return axios.get(`${URL_API}/getAll/category`);
}
