import { useState, useEffect } from "react";
import { getAllCategory } from "../services/category.services";

export const useGetAllCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategory();
                setCategories(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return { categories, loading, error };
};
