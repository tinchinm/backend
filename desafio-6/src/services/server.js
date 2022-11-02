const express = require ('express');
const app = express ();
const path = require ('path');
const fs = require('fs/promises');
const http = require ('http');
const io = require ('socket.io');

const rutaProd = path.resolve(__dirname, '../../productos.json');

const rutaMjes = path.resolve(__dirname, '../../mensajes.json');

const viewsPath = path.resolve(__dirname, '../views');

app.set('view engine', 'ejs');
app.set('views', viewsPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//ACA ESTAN LOS RENDERIZADOS QUE REALIZA EJS

app.get('/', async (req, res) => {
	res.render('index');
});

//ACA ESTA TODO LO RELACIONADO A SOCKET

const myHTTPServer = http.Server(app)

const myWSServer = io(myHTTPServer);

myWSServer.on('connection', async (socket) => {

    socket.on('productoCompleto', async (dataProd) => {
        
        const getData = await fs.readFile(rutaProd, 'utf-8');
	    const productos = JSON.parse(getData);
	    productos.push(dataProd);

	    await fs.writeFile(rutaProd, JSON.stringify(productos, null, '\t'));
    })

    const getData = await fs.readFile(rutaProd, 'utf-8');
    socket.emit('productos', getData)

    socket.on('mensajeCompleto', async (data) => {

        myWSServer.emit('mensaje', data)

        const getData = await fs.readFile(rutaMjes, 'utf-8');
	    const mensajes = JSON.parse(getData);
	    mensajes.push(data);

	    await fs.writeFile(rutaMjes, JSON.stringify(mensajes, null, '\t'));

    })
})

module.exports = myHTTPServer;