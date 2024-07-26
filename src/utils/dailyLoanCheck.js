// dailyLoanCheck.js
import Loans from '../models/loans.model.js'; // Ajusta la ruta según la estructura de tu proyecto
import { sendReminderEmail } from '../config/mailer.loans.js'; // Ajusta la ruta según la estructura de tu proyecto

export const checkLoansAndSendReminders = async () => {
  try {
    const loans = await Loans.find({});
    const today = new Date();
    const notifications = loans.map(async (loan) => {
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
    console.log('Verificación diaria completada.');
  } catch (error) {
    console.error("Error al verificar los libros prestados:", error);
  }
};
