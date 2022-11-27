// IMPORTACIONES DE LOS MODULOS
import server from './services/server';
import config from './config/config';
import { initMongoDB } from "../db/dbConnection"

// CONEXION A BASE DE DATOS
initMongoDB();

// PUESTA DEL SERVIDOR EN ESCUCHA
server.listen(config.puerto, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${config.puerto}`);
  });
server.on('error', (error) => console.log(`Error en servidor ${error}`));