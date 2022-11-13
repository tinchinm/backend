// IMPORTACIONES DE LOS MODULOS
import { Router } from 'express';
import productosRouter from './productos';

// LLAMADO DE FUNCIÓN ROUTER
const rutaPrincipal = Router();

//MAPEO DE RUTAS
rutaPrincipal.use('/productos', productosRouter);

export default rutaPrincipal;