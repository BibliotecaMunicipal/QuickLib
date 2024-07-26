import axios from "axios";

const URL_API = "http://localhost:3000/api";

export const registerBooks = async (book, token) => {
    return axios.post(`${URL_API}/register/book`, book, { headers: { Authorization: token }
    });
}

export const getBooks = async(token) => {
    return axios.get(`${URL_API}/getAll/book`, { headers: { Authorization: token }})
}

export const getActiveBooks = async () => {
    return axios.get(`${URL_API}/getActive/book`)
}

export const deleteBooks = async (id) => {
    return axios.put(`${URL_API}/delete/book/${id}`)
}

export const recoverBook = async (id) => {
    return axios.put(`${URL_API}/recover/book/${id}`, )
}

export const deleteFBook = async (id) => {
    return axios.delete(`${URL_API}/deleteF/book/${id}`)
}

export const getBooksByCategory = async (id) => {
    return axios.get(`${URL_API}/getC/book/${id}`);
}