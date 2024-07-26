import { useState, useEffect } from 'react';
import axios from 'axios';
import { getClient } from '../hooks/client.hook';
import { registerReservation, deleteReservationFromApi, getUserCountReservation, getAllReservation, deleteReservation} from '../services/reservation.services';
import { Reservations } from '../../../src/models/models';

export const useAddReservation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addReservation = async (reservationData) => {
        setLoading(true);
        try {
            const response = await registerReservation(reservationData);
            setLoading(false);
            return response.data;
        } catch (error) {
            setError(error);
            setLoading(false);
            throw error; // Re-lanza el error para que el componente lo maneje si es necesario
        }
    };

    return { addReservation, loading, error };
};

export const useDeleteReservation = () => {
  const deleteReservation = async (ISBN, username) => {
    try {
      const response = await deleteReservationFromApi(ISBN, username);
      return response.data; // Retorna el mensaje de éxito del servidor
    } catch (error) {
      throw error.response.data; // Lanza el mensaje de error del servidor
    }
  };

  return { deleteReservation };
};

export const useGetCountUserReservation = (username) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await getUserCountReservation(username); // Llama a tu función API para obtener el conteo de reservaciones
        setCount(res.data.count); // Actualiza el estado con el conteo obtenido
      } catch (error) {
        setError(error); // Captura y maneja errores
      } finally {
        setLoading(false); // Finaliza el estado de carga una vez completada la solicitud
      }
    };

    if (username) {
      fetchCount(); // Llama a fetchCount solo si username está definido (evita llamadas innecesarias antes de que se establezca username)
    }
  }, [username]); // Establece username como dependencia para que se ejecute useEffect cada vez que username cambie

  return { count, loading, error }; // Devuelve el estado y los datos relevantes para su uso en el componente
};


export const useGetAllReservation = async () => {
  try {
    const res = await getAllReservation();
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const useDeleteFReservation = async (id) => {
  try {
    const res = await deleteReservation(id)
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
}