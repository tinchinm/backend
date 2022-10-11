const express = require('express');
const app = express();
const PORT = 8080

const fs = require('fs/promises');
const ruta = './productos.json'

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
  });

server.on('error', (error) => console.log(`Error en servidor ${error}`));

const between = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

app.get('/productos', async (req, res) => {
    const getData = await fs.readFile(ruta, 'utf-8')
    const data = JSON.parse(getData)
    res.json(
    data
    )
});

app.get('/productoRandom', async (req, res) => {
    const getData = await fs.readFile(ruta, 'utf-8')
    const data = JSON.parse(getData)
    
    const id = between(1, data.length)
    const random = data.find((product) => product.id == id);
    res.json(
    random
    )
});