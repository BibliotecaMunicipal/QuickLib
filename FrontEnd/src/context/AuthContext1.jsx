/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import { useVerifyToken, useVerifyUsername } from "../hooks/client.hook";

const AuthContext = React.createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
    }
    return context;
};

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("token");
                const username = localStorage.getItem("username");
    
                console.log("Token:", token);
                console.log("Username:", username);
    
                if (token && username) {
                    await Promise.all([
                        useVerifyToken(),
                        useVerifyUsername(),
                    ]);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    setUserRole(null);
                }
            } catch (error) {
                console.error(error.message);
                setIsAuthenticated(false);
                setUserRole(null);
            }
        };
    
        checkAuth();
    
        const handleStorageChange = () => {
            checkAuth();
        };
    
        window.addEventListener("storage", handleStorageChange);
    
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);
    
    const logout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setUserRole(null);
    };

    const login = (token, username, role) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        setUserRole(role);
        setIsAuthenticated(true);
    };

    const authContextValue = { isAuthenticated, logout, login, userRole };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
