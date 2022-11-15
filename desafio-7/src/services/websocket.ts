// IMPORTACIONES DE LOS MODULOS
import { obtenerDatos, newElementWS } from '../controllers/productos.controller';
import { mensajesController } from '../controllers/mensajes.controller'
import { Server, Socket } from 'socket.io'


// CREACIÓN DE CONSTANTE PARA EXPORTAR WS
const initWSServer = (server:any) => {

// INICIO DE WS SERVER
const myWSServer = new Server (server);

// CONEXION DE SOCKET
myWSServer.on('connection', async (socket:Socket) => {

    //RECIBO UN PRODUCTO NUEVO Y LO GUARDO                          
    socket.on('productoCompleto', async (dataProd:any) => {   
        await newElementWS(dataProd); 
    })

    //ENVÍO LOS PRODUCTOS AL FRONT PARA ARMAR LA TABLA
    const getData = await obtenerDatos;
    socket.emit('productos', getData)

    //RECIBO LOS NUEVOS MENSAJES DEL CHAT
    socket.on('mensajeCompleto', async (data:any) => {

        // ENVÍO EL MENSAJE RECIBIDO A TODOS LOS CLIENTES
        myWSServer.emit('mensaje', data)

        // GRABO EL MENSAJE EN ARCHIVO DE DATOS
        await mensajesController.addMsg(data);

    })
})
}

export default initWSServer;