import axios from "axios";

const URL_API = "https://quicklib-backend.onrender.com/api";

export const registerOpinion = async (opinion) => {
    return axios.post(`${URL_API}/register/opinion`, opinion);
};

export const getOpinion = async () => {
    return axios.get(`${URL_API}/getAll/opinion`)
}

export const deleteOpinion = async (id) => {
    return axios.delete(`${URL_API}/delete/opinion/${id}`)
}

export const updateOpinion = async (id) => {
    return axios.put(`${URL_API}/update/opinion/${id}`)
}
