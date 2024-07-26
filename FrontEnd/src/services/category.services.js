import axios from "axios";

const URL_API = "http://localhost:3000/api";

export const getAllCategory = async () => {
    return axios.get(`${URL_API}/getAll/category`);
}
