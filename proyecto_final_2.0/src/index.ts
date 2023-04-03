// IMPORTACIONES DE LOS MODULOS
import server from './services/server';
import { log } from "./config/logs.config";

const puerto = process.env.port


// PUESTA DEL SERVIDOR EN ESCUCHA
server.listen(puerto , () => {
    log.info(`Servidor HTTP escuchando en el puerto ${ puerto }`);
  });
server.on('error', (error) => log.error(`Error en servidor ${error}`));