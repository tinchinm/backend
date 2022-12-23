// IMPORTACIONES DE LOS MODULOS
import server from './services/server';
import config from './config/config';
import { initMongoDB } from './db/dbConnection';

// CONEXION A BASE DE DATOS
initMongoDB();

// PUESTA DEL SERVIDOR EN ESCUCHA
server.listen(config.PUERTO , () => {
    console.log(`Servidor HTTP escuchando en el puerto ${ config.PUERTO }`);
  });
server.on('error', (error) => console.log(`Error en servidor ${error}`));