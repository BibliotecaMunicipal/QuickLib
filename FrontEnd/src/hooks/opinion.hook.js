import { deleteOpinion, getOpinion, registerOpinion, updateOpinion } from "../services/opinion.services";

export const useRegisterOpinion = async (opinion) => {
    try {
        const res = await registerOpinion(opinion)
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const useGetOpinion = async () => {
    try {
        const res = await getOpinion();
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const useDeleteOpinion = async (id) => {
    try {
        const res = await deleteOpinion(id);
        return res.data;
    } catch (error) {
        console.error("Error deleting forever opinion");
        throw error;
    }
}

export const useUpdateOpinion = async (idOpinion, showOnMainPage) => {
    try {
        const res = await updateOpinion(idOpinion, {showOnMainPage});
        return res.data;
    } catch (error) {
        throw new Error(error.res.data.message || "Error actualizando la opinion")
    }
}