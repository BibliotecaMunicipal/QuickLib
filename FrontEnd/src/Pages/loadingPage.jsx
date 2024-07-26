// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@nextui-org/react";
import { BiblioIcon } from "../utils/BiblioIcon.jsx";

// eslint-disable-next-line react/prop-types
export const LoadingPage = ({ label }) => {
    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const handleHome = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div>
                <BiblioIcon className="w-20 mb-5 dark:hidden"/>
            </div>
            <CircularProgress
            label={label}
            className="mb-8 font-medium text-center text-7x1 text-default-700 w-15"/>
        </div>
    );
};