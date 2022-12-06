// IMPORTACIONES DE LOS MODULOS
import { Router } from 'express';
import productosRouter from './productos';
import productosTest from './productos-test';
import { original, normalizado, desnormalizado } from '../utils/normalizado';

// LLAMADO DE FUNCIÓN ROUTER
const rutaPrincipal = Router();

//MAPEO DE RUTAS
rutaPrincipal.use('/productos', productosRouter);
rutaPrincipal.use('/productos-test', productosTest);
rutaPrincipal.use('/original', original);
rutaPrincipal.use('/normalizar', normalizado);
rutaPrincipal.use('/desnormalizar', desnormalizado);

export default rutaPrincipal;