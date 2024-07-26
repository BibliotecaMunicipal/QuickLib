import { useEffect, useState } from "react";
import { getStatistics, registerConsult } from "../services/consult.services";

export const useRegisterConsult = async (consult) => {
    try {
        const res = await registerConsult(consult)
        return res.data; 
    } catch (error) {
        console.error(error);
        throw error;
    }

}
 
export const useGetStatistics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getStatistics()
                console.log('API Response:', res.data);
                setStats(res.data);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        };
        fetchStats();
    }, []);
    return { stats, loading, error };
};