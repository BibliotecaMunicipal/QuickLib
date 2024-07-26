/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { AuthContext } from "../context/AuthContext1.jsx";
import { useLogin } from "../hooks/user.hook.js";
import { IoMailSharp, IoLockClosed } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import { useMutation } from 'react-query';
import toast, { Toaster } from "react-hot-toast";
import { LoadingPage } from './loadingPage.jsx';
import fondo from '../assets/fondo.png';

const Login = () => {
    const auth = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onTouched" });

    const [showPassword, setShowPassword] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const navigate = useNavigate();

    const loginMutation = useMutation(useLogin, {
        onSuccess: (data) => {
            auth.login(data.data.token, data.data.username, data.data.role);
            setShowLoading(false);
            if (data.data.role === 'admin') {
                navigate("/Dashboard");
            } else if (data.data.role === 'client') {
                navigate("/Usuarios");
            }
        },
        onError: (error) => {
            if (error.message === "Invalid credentials") {
                setShowLoading(false);
                toast.error("Credenciales Incorrectas");
            } else {
                setShowLoading(false);
                console.error("Error Inesperado", error);
            }
        },
        onMutate: () => {
            setShowLoading(true);
        },
    });

    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };

    return (
        <>
            {showLoading && <LoadingPage label="Iniciando Sesion..." />}
            {!showLoading && (
                <div className="text-white h-[100vh] flex items-center justify-center bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
                    <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-20 relative shadow-cyan-500/100">
                        <h1 className="text-4xl font-bold text-center mb-6">INICIAR SESIÓN</h1>
                        <form className="max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative my-4">
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="username">
                                    Usuario
                                </label>
                                <div className="flex items-center">
                                    <IoMailSharp className="flex-shrink-0 text-2xl text-sky-700 mr-3" />
                                    <Input
                                        type="text"
                                        name="username"
                                        id="username"
                                        {...register("username", { required: "El campo es obligatorio" })}
                                        size="lg"
                                        className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                </div>
                                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                            </div>
                            <div className="relative my-4">
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="password">
                                    Contraseña
                                </label>
                                <div className="flex items-center">
                                    <IoLockClosed className="flex-shrink-0 text-2xl text-sky-700 mr-3" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        {...register("password", { required: "El campo es obligatorio" })}
                                        size="lg"
                                        className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                            <div className="mt-3 text-end mb-14">
                                <a href="/forgotpassword" className="text-xl font-bold text-sky-700">
                                    ¿Olvidó su contraseña?
                                </a>
                            </div>
                            <div className="text-center">
                                <Button
                                    size="lg"
                                    type="submit"
                                    className="w-full py-2 text-[18px] font-medium text-white transition shadow-lg bg-blue-500 hover:bg-blue-600 hover:scale-110"
                                    isDisabled={!isValid}
                                >
                                    Iniciar Sesión
                                </Button>
                            </div>
                            <p className="mt-6 text-xl font-semibold text-center">
                                Registrándose en nuestros{" "}
                                <span className="text-sky-700">Términos y Condiciones</span>
                            </p>
                        </form>
                    </div>
                </div>
            )}
            <Toaster />
        </>
    );
};

export default Login;
