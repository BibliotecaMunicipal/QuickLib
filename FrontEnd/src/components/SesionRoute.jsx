import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext1.jsx";

const SesionRoute = ({ children }) => {
    const { isAuthenticated, userRole } = useContext(AuthContext);

    if (isAuthenticated) {
        if (userRole === 'admin') {
            return <Navigate to="/Dashboard" replace />;
        } else if (userRole === 'client') {
            return <Navigate to="/Usuarios" replace />;
        }
    }

    return children;
}

export default SesionRoute;
