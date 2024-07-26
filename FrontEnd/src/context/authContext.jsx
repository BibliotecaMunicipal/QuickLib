// import { createContext, useState, useContext, useEffect } from "react";
// import PropTypes from 'prop-types'; // Importa PropTypes para validar las props

// import { registerUser, login, deleteUserF, deleteUserPermanently } from "../api/auth";
// import { getUserFromToken } from "../api/token"; // Importa el método ficticio getUserFromToken

// export const AuthContext = createContext();

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth should be used within an AuthProvider");
//     }
//     return context;
// }; 

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const checkAuthentication = async () => {
//             try {
//                 setLoading(true);

//                 const token = localStorage.getItem("token");

//                 if (token) {
//                     const user = await getUserFromToken(token);
//                     setUser(user);
//                     setIsAuthenticated(true);
//                 } else {
//                     setUser(null);
//                     setIsAuthenticated(false);
//                 }
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         checkAuthentication();
//     }, []);

//     const register = async (userData) => {
//         try {
//             const newUser = await registerUser(userData);
//             setUser(newUser);
//             setIsAuthenticated(true);
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const signin = async (credentials) => {
//         try {
//             const loggedInUser = await login(credentials);
//             setUser(loggedInUser);
//             setIsAuthenticated(true);
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const deleteUserAccount = async (username) => {
//         try {
//             await deleteUserF(username);
//             setUser(null);
//             setIsAuthenticated(false);
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const deletePermanently = async (username) => {
//         try {
//             await deleteUserPermanently(username);
//             setUser(null);
//             setIsAuthenticated(false);
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const logout = () => {
//         setUser(null);
//         setIsAuthenticated(false);
//     };

//     return (
//         <AuthContext.Provider value={{
//             user,
//             isAuthenticated,
//             loading,
//             error,
//             register,
//             signin,
//             logout,
//             deleteUserAccount,
//             deletePermanently
//         }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// AuthProvider.propTypes = {
//     children: PropTypes.node.isRequired,
// };
