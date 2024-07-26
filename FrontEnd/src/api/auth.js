// import axios from './axios';

// export const registerUser = async (userData) => {
//     try {
//         const response = await axios.post(`/registerUser`, userData);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response.data.error || "Error registering user");
//     }
// };

// export const login = async (credentials) => {
//     try {
//         const response = await axios.post(`/login`, credentials);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response.data.error || "Error logging in");
//     }
// };

// export const deleteUserF = async (username) => {
//     try {
//         const response = await axios.put(`/deleteUser/${username}`);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response.data.error || "Error deleting user");
//     }
// };

// export const deleteUserPermanently = async (username) => {
//     try {
//         const response = await axios.delete(`/deleteUser/${username}`);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response.data.error || "Error permanently deleting user");
//     }
// };
