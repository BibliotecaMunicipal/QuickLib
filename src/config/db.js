//work
import mongoose from "mongoose";
const MONGO_URL = "mongodb+srv://hayuntamiento2124:Biblioteca_2124@cluster0.pnwxmcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Este archivo es para crear la conexion a base de datos
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connect DB");
  } catch (error) {
    console.log(error);
  }
};
