/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
// src/Pages/Admin/Consultas.jsx
import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../components/Admin/HeaderAdmin.jsx';
import { useGetLoans, useReturnLoan, useRegisterLoan} from '../../hooks/loan.hook.js';
import { FaUndoAlt } from 'react-icons/fa';

const Consulta = () => {
  const [activeTab, setActiveTab] = useState('Prestados');
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await useGetLoans();
        setLoans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const handleReturn = async (idLoan) => {
    setLoading(true);
    setError(null);
    try {
      await useReturnLoan(idLoan);
      setLoans(loans.filter(loan => loan.idLoan !== idLoan));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundClass = () => {
    switch (activeTab) {
      case 'Prestados':
        return 'from-blue-500 via-slate-50 to-blue-500 dark:from-blue-700 dark:via-black dark:to-blue-700';
      case 'Perdidos':
        return 'from-red-500 via-white to-red-500 dark:from-red-700 dark:via-black dark:to-red-700';
      case 'Donados':
        return 'from-green-500 via-white to-green-500 dark:from-green-700 dark:via-black dark:to-green-700';
      default:
        return 'from-blue-300 via-white to-blue-300 dark:from-blue-500 dark:via-black dark:to-blue-500';
    }
  };

  const data = {
    Prestados: loans,
    Perdidos: [],
    Donados: []
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${getBackgroundClass()} text-black dark:text-white`}>
      <HeaderAdmin />
      <div className="flex justify-around py-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'Prestados' ? 'bg-blue-700 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}
          onClick={() => setActiveTab('Prestados')}
        >
          Prestados
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'Perdidos' ? 'bg-red-500 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}
          onClick={() => setActiveTab('Perdidos')}
        >
          Perdidos
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'Donados' ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}
          onClick={() => setActiveTab('Donados')}
        >
          Donados
        </button>
      </div>
      <div className="container min-w-full p-4 bg-gradient-to-b border-solid border-2 border-sky-700 rounded-lg overflow-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700 divide-y">
            <thead>
              <tr>
                <th className="border border-gray-200 dark:border-gray-700 p-2">Titulo</th>
                <th className="border border-gray-200 dark:border-gray-700 p-2">Usuario</th>
                <th className="border border-gray-200 dark:border-gray-700 p-2">Nombre</th>
                <th className="border border-gray-200 dark:border-gray-700 p-2">Apellidos</th>
                <th className="border border-gray-200 dark:border-gray-700 p-2">Telefono</th>
                <th className="border border-gray-200 dark:border-gray-700 p-2">Direccion</th>
                <th className="border border-gray-200 dark:border-gray-700 p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data[activeTab].map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 dark:border-gray-700 p-2">{item.title}</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-2">{item.username}</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-2">{item.firstName}</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-2">{item.lastName}</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-2">{item.phone}</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-2">{item.address}</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-2 text-center">
                    <button
                      onClick={() => handleReturn(item.idLoan)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaUndoAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Consulta;
