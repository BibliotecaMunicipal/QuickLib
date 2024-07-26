import cron from "node-cron"
import { checkLoansAndSendReminders } from './dailyLoanCheck.js'; // Ajusta la ruta según la estructura de tu proyecto

cron.schedule('00 19 * * *', async () => {
    try {
        console.log('Running overdue loans update task...');
        await checkLoansAndSendReminders();
        console.log('Overdue loans updated successfully.');
    } catch (error) {
        console.error('Error updating overdue loans:', error);
    }
});
