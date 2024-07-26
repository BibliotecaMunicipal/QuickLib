import {Books, Donations, Categorys} from "../models/models.js";

export const registerBook = async (req, res) => {
    const { ISBN, title, author, publisher, yearPublication, copies, category, donation, status } = req.body;
  
    try {
      // Verificar si la categoría existe por su nombre
      const existingCategory = await Categorys.findOne({ nameCategory: category });
      if (!existingCategory) {
        return res.status(400).json({ error: "La categoría no existe." });
      }
  
      const categoryID = existingCategory.Category; // Obtener el ID de la categoría
  
      // Verificar si la donación es del gobierno o ciudadano
      if (donation === 'Gobierno' || donation === 'Ciudadano') {
        // Crear una nueva entrada en la tabla de donaciones
        const newDonation = new Donations({
          typeDonation: donation,
          ISBN,
          title,
          author,
          publisher,
          yearPublication,
          copies,
          category: categoryID, // Utilizar el ID de la categoría
          status: false, // Estado en false para donaciones
        });
  
        const savedDonation = await newDonation.save();
  
        // Construir el objeto de respuesta
        const response = {
          tipo_donacion: savedDonation.typeDonation,
          ISBN: savedDonation.ISBN,
          title: savedDonation.title,
          author: savedDonation.author,
          publisher: savedDonation.publisher,
          yearPublication: savedDonation.yearPublication,
          copies: savedDonation.copies,
          category: savedDonation.category,
          status: savedDonation.status,
        };
  
        // Enviar la respuesta al cliente
        res.status(200).json(response);
      } else {
        // Crear una nueva entrada en la tabla de libros
        const newBook = new Books({
          ISBN,
          title,
          author,
          publisher,
          yearPublication,
          copies,
          category: categoryID, // Utilizar el ID de la categoría
          donation: 'Ninguna',
          status: true,
        });
  
        const savedBook = await newBook.save();
  
        // Construir el objeto de respuesta
        const response = {
          ISBN: savedBook.ISBN,
          title: savedBook.title,
          author: savedBook.author,
          publisher: savedBook.publisher,
          yearPublication: savedBook.yearPublication,
          copies: savedBook.copies,
          category: savedBook.category,
          donation: savedBook.donation,
          status: savedBook.status,
        };
  
        // Enviar la respuesta al cliente
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
export const deleteBook = async (req, res) => {
    try {
        const { code } = req.params;
        const existingBook = await Books.findOne({ ISBN : code });
        if (!existingBook || existingBook.status === "false"){
            return res.status(404).send("Book not found");
        }
        existingBook.status = false;
        const updateBook = await existingBook.save();
        res.send(updateBook);
    } catch (error) {
        res.status(500).send("Book cannot be deleted")
    }
}

export const deleteBookF = async (req, res) => {
    try {
        const { code } = req.params;
        const existingBook = await Books.findOne({ ISBN: code });
        if(!existingBook || existingBook.status === "true") {
            return res.status(404).send("Book not found");
        }
        const deletedUser = await existingBook.deleteOne();
        res.send(deletedUser);
    } catch (error) {
        res.status(500).send("Book cannot be deleted")
    }
}

export const recoverBook = async (req, res) => {
    try {
        const { code } = req.params;
        const existingBook = await Books.findOne({ ISBN: code });
        if(!existingBook){
            return res.status(404).send("Book not found");
        }
        existingBook.status = true;
        const updatedBook = await existingBook.save();
        res.send(updatedBook);
    } catch (error) {
        res.status(500).send("Book cannot be recover")
    }
}


export const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find();
    console.log(books);
    res.send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener Books");
  }
};

// Controlador para obtener libros por categoría
export const getBooksByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const books = await Books.find({ category }); // Filtra por categoría y estado activo
  
    if (books.length === 0) {
      return res.status(404).json({ error: "No se encontraron libros activos para esta categoría." });
    }
  
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  export const countBooksActive = async (req, res) => {
    try {
        const booksActive = await Books.countDocuments({ status: true }); // Usamos true sin comillas para buscar booleanos
        res.json({ librosActivos: booksActive }); // Devolvemos un objeto con la propiedad librosActivos
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
};