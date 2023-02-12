import server from './services/server';

const PORT = process.env.PORT

// PUESTA DEL SERVIDOR EN ESCUCHA
server.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
  });

server.on('error', (error:any) => console.log(`Error en servidor ${error}`));