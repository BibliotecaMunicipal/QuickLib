import { getDonations, altDonation } from "../services/donation.services";

export const useGetDonation = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await getDonations(token);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const useAltDonation = async (id) => {
    try {
        const res = await altDonation(id);
        return res.data;
    } catch (error) {
        console.error("Error Dar de Alta Libro:", error);
        throw error;
    }
}