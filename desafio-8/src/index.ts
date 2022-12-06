// IMPORTACIONES DE LOS MODULOS
import server from './services/server';
import config from './config/config';
import initWSServer from './services/websocket'

// INICIO DE WSSERVER
initWSServer(server)

// PUESTA DEL SERVIDOR EN ESCUCHA
server.listen(config.puerto, () => {
    console.log(`Servidor http escuchando en el puerto ${config.puerto}`);
  });

server.on('error', (error:any) => console.log(`Error en servidor ${error}`));