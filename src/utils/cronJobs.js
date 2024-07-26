

import cron from 'node-cron';
import { updateOverdueLoans } from '../controllers/loans.controller.js'; // Ajusta la importación según tu estructura

// Configura la tarea cron para ejecutar updateOverdueLoans cada día a las 6:00 PM
cron.schedule('00 12 * * *', async () => {
    try {
        console.log('Running overdue loans update task...');
        await updateOverdueLoans();
        console.log('Overdue loans updated successfully.');
    } catch (error) {
        console.error('Error updating overdue loans:', error);
    }
});
