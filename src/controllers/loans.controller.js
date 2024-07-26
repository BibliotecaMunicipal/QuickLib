// loanController.js

import { Loans, Books, Client, lossBooks } from "../models/models.js";
import mongoose from "mongoose";
import { sendReminderEmail } from "../config/mailer.loans.js";

// Función para registrar un nuevo préstamo
export const registerLoans = async (req, res) => {
    const { idLoan, ISBN, username, creatdAt, finalDate } = req.body;

    try {
        const client = await Client.findOne({ username });
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        if (!client.status) {
            return res.status(400).json({ error: "Client is not allowed to borrow books" });
        }

        const activeLoansCount = await Loans.countDocuments({ username, finalDate: { $gte: new Date() } });
        console.log(`Active loans for ${username}: ${activeLoansCount}`);
        
        if (activeLoansCount >= 3) {
            return res.status(400).json({ error: "Client has already borrowed the maximum number of books (3)" });
        }

        const book = await Books.findOne({ ISBN });
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        if (book.copies <= 0) {
            return res.status(400).json({ error: "No copies available for this book" });
        }

        const newLoan = new Loans({
            idLoan,
            ISBN,
            username,
            title: book.title,
            author: book.author,
            firstName: client.firstName,
            lastName: client.lastName,
            address: client.address,
            phoneNumber: client.phoneNumber,
            email: client.email,
            creatdAt,
            finalDate,
        });

        const savedLoan = await newLoan.save();
        book.copies -= 1;

        if (book.copies === 0) {
            book.status = false;
        }

        await book.save();

        const response = {
            idLoan: savedLoan.idLoan,
            creatdAt: savedLoan.creatdAt,
            finalDate: savedLoan.finalDate,
            book: {
                title: book.title,
                author: book.author,
            },
            client: {
                firstName: client.firstName,
                lastName: client.lastName,
                address: client.address,
                phoneNumber: client.phoneNumber,
                email: client.email
            },
        };

        return res.status(200).json(response);

    } catch (error) {
        console.error("Error registering loan:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Función para mover préstamos vencidos a la tabla de libros perdidos
export const updateOverdueLoans = async () => {
    try {
        const currentDate = new Date();
        const overdueLoans = await Loans.find({ finalDate: { $lt: currentDate } });

        for (const loan of overdueLoans) {
            const book = await Books.findOne({ ISBN: loan.ISBN });
            const client = await Client.findOne({ username: loan.username });

            if (book && client) {
                const lossBook = new lossBooks({
                    idLoan: loan.idLoan,
                    ISBN: loan.ISBN,
                    username: loan.username,
                    title: loan.title,
                    author: loan.author,
                    firstName: client.firstName,
                    lastName: client.lastName,
                    address: client.address,
                    phoneNumber: client.phoneNumber,
                    email: client.email,
                    returnDate: currentDate,
                });

                await lossBook.save();

                // Actualizar el estado del cliente
                client.status = false;
                await client.save();

                // Eliminar el préstamo de la tabla de préstamos (Loans)
                await Loans.findOneAndDelete({ idLoan: loan.idLoan });
            }
        }

        console.log("Updated overdue loans successfully");
    } catch (error) {
        console.error("Error updating overdue loans:", error);
    }
};

// Configurar la ejecución periódica de updateOverdueLoans
setInterval(updateOverdueLoans, 86400000); 

// Función para devolver un libro prestado
export const returnLoan = async (req, res) => {
    try {
        const { idLoan } = req.params;

        // Obtener el préstamo relacionado con el idLoan
        const loan = await Loans.findOne({ idLoan });
        if (!loan) {
            return res.status(404).send("Loan not found");
        }

        // Obtener el libro relacionado con el ISBN del préstamo
        const book = await Books.findOne({ ISBN: loan.ISBN });
        if (!book) {
            return res.status(404).send("Book not found");
        }

        // Iniciar una sesión para la transacción
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Aumentar la cantidad de ejemplares disponibles
            book.copies += 1;

            // Si el libro estaba no disponible y ahora tiene ejemplares, cambiar su estado a disponible
            if (book.copies > 0) {
                book.status = true;
            }

            // Guardar los cambios del libro
            await book.save({ session });

            // Eliminar el préstamo de la tabla de préstamos (Loans)
            await Loans.findOneAndDelete({ idLoan }, { session });

            // Confirmar la transacción
            await session.commitTransaction();
            session.endSession();

            // Enviar la respuesta al cliente
            return res.send({ message: "Book returned successfully", book });
        } catch (transactionError) {
            // Abortar la transacción en caso de error
            await session.abortTransaction();
            session.endSession();
            return res.status(500).send("Book return failed");
        }
    } catch (error) {
        return res.status(500).send("An error occurred while returning the book");
    }
};

// Función para obtener todos los préstamos
export const getAllLoans = async (req, res) => {
    try {
      const loans = await Loans.find();
      return res.send(loans);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al obtener Loans");
    }
};

export const getLoansUser = async (req, res) => {
    const { username } = req.params;
    try {
      const loansUser = await Loans.find({ username });
      if (!loansUser.length) {
        return res.status(404).json({ message: 'No se encontraron libros prestados para este usuario' });
      }
  
      // Calcular días restantes y enviar correos electrónicos si quedan 3 días o menos
      const today = new Date();
      const notifications = loansUser.map(async (loan) => {
        const returnDate = new Date(loan.finalDate);
        const diffTime = returnDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
        if (diffDays <= 3 && diffDays >= 0) {
          const message = `El libro "${loan.title}" debe ser entregado en ${diffDays} días.`;
          try {
            await sendReminderEmail(loan.email, loan.title, message);
            console.log(`Correo enviado a ${loan.email}`);
          } catch (error) {
            console.error(`Error al enviar correo a ${loan.email}:`, error);
          }
        }
      });
  
      await Promise.all(notifications);
  
      return res.status(200).json(loansUser);
    } catch (error) {
      console.error("Error al obtener los libros prestados del usuario:", error);
      return res.status(500).json({ message: "Error al obtener los libros prestados del usuario" });
    }
  };


