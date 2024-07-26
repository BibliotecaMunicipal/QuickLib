import { Donations, Books } from "../models/models.js"; // Asegúrate de importar correctamente tu modelo de libros

export const altaLibroDonado = async (req, res) => {
    const { ISBN } = req.params;

    try {
        // Log para depuración
        console.log("ISBN recibido:", ISBN);

        // Buscar el libro donado en la tabla de Donations
        const donation = await Donations.findOne({ ISBN });
        
        // Log para verificar la búsqueda
        console.log("Resultado de la búsqueda:", donation);

        if (!donation) {
            return res.status(404).json({ error: "No se encontró el libro donado con ese ISBN." });
        }

        // Crear un nuevo libro en la tabla de Books
        const newBook = new Books({
            ISBN: donation.ISBN,
            title: donation.title,
            author: donation.author,
            publisher: donation.publisher,
            yearPublication: donation.yearPublication,
            copies: donation.copies,
            category: donation.category,
            donation: donation.typeDonation,
            status: true, // Cambiar el estado a true para dar de alta el libro
        });

        const savedBook = await newBook.save();

        // Eliminar el registro de donación de la tabla de Donations
        await Donations.findOneAndDelete({ ISBN });

        // Construir el objeto de respuesta para el libro dado de alta
        const response = {
            ISBN: savedBook.ISBN,
            title: savedBook.title,
            author: savedBook.author,
            publisher: savedBook.publisher,
            yearPublication: savedBook.yearPublication,
            copies: savedBook.copies,
            category: savedBook.category,
            donation: savedBook.donation,
            description: savedBook.description,
            status: savedBook.status,
        };

        // Enviar la respuesta al cliente
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getAllDonationBooks = async (req, res) => {
  try {
    const donations = await Donations.find();
    console.log(donations);
    res.send(donations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener Books Doantions");
}
};