// IMPORTACIONES DE LOS MODULOS
import mongoose from 'mongoose'
import config from '../config/config';

//RUTA DE ACCESO A LAS BASES DE DATOS
const connectionPath:any = config.MONGO_ATLAS_URL

//INICIALIZACIÓN DE LA BASE DE DATOS
export const initMongoDB = async () => {
    try {
      await mongoose.connect(connectionPath);
      console.log('Conexion a DB Exitosa!');
    } 
    catch (error) {
      console.log(`Ha ocurrido el siguiente error: ${error}`);
      return error;
    }
  };