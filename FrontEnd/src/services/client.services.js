import axios from "axios";

const URL_API = "https://quicklib-ugh1.onrender.com/api";

export function registerClient(client){
    return axios.post(`${URL_API}/register/client`, client);
}

export function getClient(client) {
    return axios.get(`${URL_API}/get/client/${client}`)
}

export function verifyToken(token) {
    return axios.get(`${URL_API}/verify-token`, {headers: {Authorization: token}})
}
 
export function verifyUsername(username){
    return axios.get(`${URL_API}/verify-username/${username}`)
}

export function deleteClient(id) {
    return axios.put(`${URL_API}/delete/client/${id}`)
}

export function deleteFClient(client, token) {
    return axios.delete(`${URL_API}/deleteF/client/${client}`, { headers: { Authorization: token}})
}


export function recoverClient(id) {
    return axios.put(`${URL_API}/recover/client/${id}`)
}

export function getAllClient(){
    return axios.get(`${URL_API}/getAll/client`);
}

export function updateClient(id, data) {
    return axios.put(`${URL_API}/update/client/${id}`, data);
}
  
