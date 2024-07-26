/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// /src/Pages/Client/carrito_prestamo.jsx

import React, { useState, useEffect } from 'react';
import HeaderClient from '../../components/user/HeaderClient.jsx';
import backgroundImage from '../../assets/gif/imagen_interior/fondo.gif'; // Asegúrate de ajustar la ruta de la imagen
import useGetLoansUser from '../../hooks/loan.hook.js';

const CarritoPrestamo = ({ username }) => {
  const { loans, loading, error } = useGetLoansUser(username);
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const calculateDaysRemaining = (finalDate) => {
    const today = new Date();
    const returnDate = new Date(finalDate);
    const diffTime = Math.abs(returnDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className={`relative min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <HeaderClient changeTheme={changeTheme} theme={theme} />
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex flex-col md:flex-row w-full justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col space-y-4 p-4 w-full md:w-1/2">
            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && loans.length === 0 && <p>No hay libros prestados.</p>}
            {loans.map((loan) => (
              <div key={loan.idLoan} className="bg-gray-500 bg-opacity-30 backdrop-blur-md rounded-lg p-4 text-justify w-full md:w-96 h-28">
                <h2 className="text-lg font-bold">{loan.title}</h2>
                <p>Autor: {loan.author}</p>
                <p>Días Restantes: {calculateDaysRemaining(loan.finalDate)}</p>
              </div>
            ))}
          </div>
          <div className="relative w-full md:w-1/2 h-96 rounded-96 overflow-hidden shadow-lg bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="absolute inset-0 bg-black opacity-30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoPrestamo;
