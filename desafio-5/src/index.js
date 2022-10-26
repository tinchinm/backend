const server = require('./services/server.js')

const PORT = 8080

server.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
  });

server.on('error', (error) => console.log(`Error en servidor ${error}`));

