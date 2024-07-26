import { registerBooks, getBooks, deleteBooks, deleteFBook, recoverBook, getActiveBooks, getBooksByCategory } from "../services/book.services.js";

export const useRegisterBook = async (book) => {
    try {
        const token = localStorage.getItem("token");
        const res = await registerBooks(book, token);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const useGetBooks = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await getBooks(token);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const useGetActiveBooks = async () => {
    try {
        const res = await getActiveBooks()
        return res.data.librosActivos;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const useDeleteBooks = async (id) => {
    try {
        const res = await deleteBooks(id);
        return res.data;
    } catch (error) {
        console.error("Error deleting book", error );
        throw error;
    }
}

export const useDeleteFBook = async (id) => {
    try {
        const res = await deleteFBook(id);
        return res.data;
    } catch (error) {
        console.error("Error deleting forever book");
        throw error;
    }
}

export const useRecoverBook = async (id) => {
try {
    const res = await recoverBook(id);
    return res.data;
} catch (error) {
    console.error("Error recover book");
    throw error;
}

}

export const useGetBooksByCategory = async (id) => {
    try {
        const res = await getBooksByCategory(id)
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}