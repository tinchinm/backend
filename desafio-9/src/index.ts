// IMPORTACIONES DE LOS MODULOS
import server from './services/server';
import { initMongoDB } from './db/dbConnection';

// CONEXION A BASE DE DATOS
initMongoDB();

// PUESTA DEL SERVIDOR EN ESCUCHA
server.listen(process.env.PORT , () => {
    console.log(`Servidor HTTP escuchando en el puerto ${ process.env.PORT }`);
  });
server.on('error', (error) => console.log(`Error en servidor ${error}`));