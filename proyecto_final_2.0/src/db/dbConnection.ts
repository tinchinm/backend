// IMPORTACIONES DE LOS MODULOS
import mongoose from 'mongoose'
import { log } from "../config/logs.config";

//RUTA DE ACCESO A LAS BASES DE DATOS
const connectionPath:any = process.env.MONGO_ATLAS

//INICIALIZACIÓN DE LA BASE DE DATOS
export const initMongoDB = async () => {
    try {
      await mongoose.connect(connectionPath);
      log.info('Conexion a DB Exitosa!');
    } 
    catch (error) {
      log.error(`Ha ocurrido el siguiente error: ${error}`);
      return error;
    }
  };