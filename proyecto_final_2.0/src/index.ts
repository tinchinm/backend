// IMPORTACIONES DE LOS MODULOS
import server from './services/server';
import { initMongoDB } from './db/dbConnection';
import puerto from './config/config'
import { log } from "./config/logs.config";

// CONEXION A BASE DE DATOS
initMongoDB();

// PUESTA DEL SERVIDOR EN ESCUCHA
server.listen(puerto , () => {
    log.info(`Servidor HTTP escuchando en el puerto ${ puerto }`);
  });
server.on('error', (error) => log.error(`Error en servidor ${error}`));