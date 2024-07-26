import { registerLoans, getLoans, returnLoan, getUserLoan } from '../services/loan.services.js';
import { useState, useEffect } from 'react';
import { getClient } from './client.hook.js';

export const useRegisterLoan = async (loan) => {
  try {
    const token = localStorage.getItem("token");
    const res = await registerLoans(loan, token);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useGetLoans = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await getLoans(token);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
 
export const useReturnLoan = async (id) => {
  try {
    const res = await returnLoan(id); // Llama a la función de servicio para devolver el préstamo
    return res.data; // Devuelve los datos recibidos en la respuesta

  } catch (error) {
    console.error("Error returning loan:", error);
    throw error; // Lanza el error para manejarlo en componentes superiores
  }
};


const useGetLoansUser = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const clientResponse = await getClient();
        const username = clientResponse.data.username;
        if (username) {
          const response = await getUserLoan(username);
          setLoans(response.data);
        } else {
          setError('No se encontró el nombre de usuario');
        }
      } catch (error) {
        setError('Error al obtener los libros prestados del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  return { loans, loading, error };
};

export default useGetLoansUser;
