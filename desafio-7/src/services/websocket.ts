// IMPORTACIONES DE LOS MODULOS
import fs from "fs/promises"
import path from "path";
import { productController } from '../controllers/productos.controller';

const io = require ('socket.io');

// DECLARACION DE RUTAS
const rutaProd = path.resolve(__dirname, '../../productos.json');
const rutaMjes = path.resolve(__dirname, '../../mensajes.json');

// CREACIÓN DE CONSTANTE PARA EXPORTAR WS
const initWSServer = (server:any) => {

const myWSServer = io(server);

myWSServer.on('connection', async (socket:any) => {

    socket.on('productoCompleto', async (dataProd:any) => {
        
        await productController.newElement(dataProd);
    })

    const getData = await productController.obtenerDatos();
    socket.emit('productos', getData)

    socket.on('mensajeCompleto', async (data:any) => {

        myWSServer.emit('mensaje', data)

        const getData = await fs.readFile(rutaMjes, 'utf-8');
	    const mensajes = JSON.parse(getData);
	    mensajes.push(data);

	    await fs.writeFile(rutaMjes, JSON.stringify(mensajes, null, '\t'));

    })
})
}

export default initWSServer;