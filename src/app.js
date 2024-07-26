import express from "express";
import morgan from "morgan";
import authRoute from "./routers/auth.router.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import './utils/cronJobs.js';
import './utils/cronJobsLoan.js';
import fs from 'fs';
const app = express();

// Obtener el nombre de archivo y el directorio de la URL actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verificar si el archivo index.html existe
const indexPath = path.join(__dirname, '../FrontEnd', 'index.html');
if (fs.existsSync(indexPath)) {
  console.log('index.html found at', indexPath);
} else {
  console.log('index.html not found at', indexPath);
}

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", authRoute);

// Servir archivos estáticos del directorio 'build' en 'frontend'
app.use(express.static(path.join(__dirname, '../FrontEnd')));

// Cualquier otra ruta debe devolver el archivo 'index.html'
app.get('*', (req, res) => {
  res.sendFile(indexPath);
});



export default app;