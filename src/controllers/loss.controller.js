import { Books, Client, lossBooks, Loans } from "../models/models.js";

export const recoverLostBook = async (req, res) => {
    const { idLoan } = req.params;

    try {
        // Buscar el registro del libro perdido
        const lostBook = await lossBooks.findOne({ idLoan });

        if (!lostBook) {
            return res.status(404).json({ error: "Lost book record not found" });
        }

        // Obtener el libro relacionado con el ISBN
        const book = await Books.findOne({ ISBN: lostBook.ISBN });

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Obtener el cliente relacionado con el username
        const client = await Client.findOne({ username: lostBook.username });

        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        // Actualizar el estado del cliente a autorizado para tomar prestados más libros
        client.status = true;
        await client.save();

        // Añadir un ejemplar al libro recuperado
        book.copies += 1;
        book.status = true; // Cambiar el estado del libro a disponible
        await book.save();

        // Eliminar el registro de libro perdido
        await lossBooks.findOneAndDelete({ idLoan });

        // Respuesta exitosa
        res.status(200).json({ message: "Book recovered successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllLoss = async (req, res) => {
  try {
    const loss = await lossBooks.find();
    console.log(loss);
    res.send(loss);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener Books Loss");
  }
};

export const deleteLostBook = async (req, res) => {
    const { idLoan } = req.params;

    try {
        console.log("Buscando libro perdido con idLoan:", idLoan);
        // Buscar el libro perdido basado en idLoan
        const lostBook = await lossBooks.findOne({ idLoan });

        if (!lostBook) {
            console.log("Libro perdido no encontrado");
            return res.status(404).json({ error: "Lost book not found" });
        }

        const { ISBN } = lostBook;
        console.log("Libro perdido encontrado, ISBN:", ISBN);

        // Verificar si hay otros ejemplares perdidos con el mismo ISBN
        const otherLostBooks = await lossBooks.find({ ISBN, idLoan: { $ne: idLoan } });
        // Verificar si hay préstamos activos con el mismo ISBN
        const activeLoans = await Loans.find({ ISBN }); // Ajusta el filtro según tu esquema de préstamos

        if (otherLostBooks.length > 0 || activeLoans.length > 0) {
            console.log("Hay otros ejemplares perdidos o en préstamo, eliminando solo el registro del libro perdido");
            console.log(`Libros Prestados: ${activeLoans.length}, Libros Perdidos: ${otherLostBooks.length}`);
            // Eliminar solo el registro del libro perdido basado en idLoan
            await lossBooks.deleteOne({ idLoan });
            return res.status(200).json({ message: "Lost book record deleted successfully, but there are other copies in lost or loaned status" });
        }

        console.log("No hay otros ejemplares perdidos o en préstamo, verificando ejemplares físicos");

        // Buscar el libro correspondiente en la colección de libros usando el ISBN
        const book = await Books.findOne({ ISBN });

        if (!book) {
            console.log("Libro no encontrado en la biblioteca");
            return res.status(404).json({ error: "Book not found in Library" });
        }

        if (book.copies > 0) {
            console.log("Existen más ejemplares físicos en la biblioteca, solo se eliminará el registro del libro perdido");
            // Eliminar solo el registro del libro perdido basado en idLoan
            await lossBooks.deleteOne({ idLoan });
            return res.status(200).json({ message: "Lost book record deleted successfully, but other physical copies exist in the library" });
        }

        console.log("Solo existe un ejemplar físico en la biblioteca, eliminando libro físico y registro del libro perdido");

        // Eliminar el libro de la colección de libros
        await Books.deleteOne({ ISBN });
        await lossBooks.deleteOne({ idLoan });

        return res.status(200).json({ message: "Lost book and its record deleted successfully" });
    } catch (error) {
        console.error("Error deleting lost book", error);
        return res.status(500).json({ error: error.message });
    }
};
export const countLossBooksActive = async (req, res) => {
    try {
        const booksLossActive = await lossBooks.countDocuments(); // Usamos true sin comillas para buscar booleanos
        res.json({ librosPerdidos: booksLossActive }); // Devolvemos un objeto con la propiedad librosActivos
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
};