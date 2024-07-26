import axios from "axios";

const URL_API = "https://quicklib-ugh1.onrender.com/api";

export function login(user) {
    return axios.post(`${URL_API}/login/user`, user);
}

export function registerUser(user){
    const newUser = {
        username: user.username,
        password: user.passwords.password,
    };
    return axios.post(`${URL_API}/register/user`, newUser);
}

