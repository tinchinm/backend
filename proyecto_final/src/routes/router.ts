// IMPORTACIONES DE LOS MODULOS
import { Router } from 'express';
import productosRouter from './productos';
import carritoRouter from './carrito';

// LLAMADO DE FUNCIÓN ROUTER
const rutaPrincipal = Router();

//MAPEO DE RUTAS
rutaPrincipal.use('/productos', productosRouter);

rutaPrincipal.use('/carrito', carritoRouter);

export default rutaPrincipal;