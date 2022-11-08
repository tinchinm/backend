// IMPORTACIONES DE LOS MODULOS
import server from './services/server';
import config from './config/config';

// PUESTA DEL SERVIDOR EN ESCUCHA
server.listen(config.puerto, () => {
    console.log(`Servidor http escuchando en el puerto ${config.puerto}`);
  });

server.on('error', (error) => console.log(`Error en servidor ${error}`));
