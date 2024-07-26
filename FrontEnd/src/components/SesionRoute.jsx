import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext1.jsx";

const SesionRoute = ({ Children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if(isAuthenticated){
        return <Navigate to="/Dashboard" replace />
    }

    return Children;
}

export default SesionRoute;