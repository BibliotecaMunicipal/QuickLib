import { deleteLoss, getLoss, recoverLoss, getBookLoss } from "../services/loss.services";

export const useGetLoss = async () => { 
    try {
        const token = localStorage.getItem("token");
        const res = await getLoss(token);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const useGetLossBooks = async () => {
  try {
      const res = await getBookLoss()
      return res.data.librosPerdidos;
  } catch (error) {
      console.error(error);
      throw error;
  }
}

export const useRecoverLoss = async (id) => {
    try {
      const res = await recoverLoss(id); // Llama a la función de servicio para devolver el préstamo
      return res.data; // Devuelve los datos recibidos en la respuesta
  
    } catch (error) {
      console.error("Error returning loan:", error);
      throw error; // Lanza el error para manejarlo en componentes superiores
    }
  };

  export const useDeleteLoss = async (id) => {
    try {
        const res = await deleteLoss(id);
        return res.data;
    } catch (error) {
        console.error("Error Delete Loss", error);
        throw error;
    }
  }