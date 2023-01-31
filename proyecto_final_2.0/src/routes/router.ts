// IMPORTACIONES DE LOS MODULOS
import { Router } from 'express';
import usersRouter from './user.router'
import carritoRouter from './carrito.router';
import productosRouter from './productos.router';

// LLAMADO DE FUNCIÓN ROUTER
const rutaPrincipal = Router();

//MAPEO DE RUTAS
rutaPrincipal.use('/', usersRouter);
rutaPrincipal.use('/productos', productosRouter);
rutaPrincipal.use('/carrito', carritoRouter);

export default rutaPrincipal;