// IMPORTACIONES DE LOS MODULOS
import mongoose from 'mongoose'

//RUTA DE ACCESO A LAS BASES DE DATOS
const connectionPath = 'mongodb://localhost:27017/ecommerce'

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