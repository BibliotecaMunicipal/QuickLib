import app from "./app.js"; 
import {connectDB} from "./config/db.js"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import dotenv from 'dotenv';
  
dotenv.config();

connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
  });
}).catch(err => {
  console.error('Error connecting to the database:', err);
});