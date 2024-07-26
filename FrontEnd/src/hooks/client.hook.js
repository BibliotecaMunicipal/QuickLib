// eslint-disable-next-line no-unused-vars
import { recoverClient, deleteClient, updateClient } from "../services/client.services.js";
// eslint-disable-next-line no-unused-vars
import { clientService, userService } from "../services/services.js";


export const getClient = async () => {
    try {
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        const res = await clientService.getClient(username, token);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const useVerifyToken = async () => {
    try {
        const res = await clientService.verifyToken(localStorage.getItem("token"));
        return res;
    } catch (error) {
        if(error.response && error.response.status === 401) {
            console.log(error);
            console.log(localStorage.getItem("token"));
            throw new Error("Token expired or Invalid");
        }else {
            console.log(error);
            console.log('Hola');
            throw new Error("Something went wrong");
        }
    }
};

export const useVerifyUsername = async () => {
    try {
        const res = await clientService.verifyUsername(localStorage.getItem("username"));
        return res;
    } catch (error) {
        if(error.response && error.response.status === 401){
            console.log(error);
            console.log(localStorage.getItem("token"));
            throw new Error("Token expired or Invalid");
        }else {
            console.log(error);
            throw new Error("Something went wrong");
        }
    }
}

export const getAllClient = async()=>{

    try {
        const token = localStorage.getItem("token");
        const res = await clientService.getAllClient(token);  // Asegúrate de que clientService.getClients() haga la petición correcta
        return res.data; // Asegúrate de que la estructura de la respuesta sea correcta
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const useRecoverClient = async (id) => {
    try {
        const res = await recoverClient(id)
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const useDeleteClient = async (id) => {
    try {
        const res = await deleteClient(id);
        return res.data;
    } catch (error) {
        console.error("Error Delete Client", error);
        throw error
    }
}


export const useUpdateClient = async (id, data) => {
    try {
        const res = await updateClient(id, data);
        return res.data;
    } catch (error) {
        console.error("Error Update Client", error);
        throw error;
    }
}
