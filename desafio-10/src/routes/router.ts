// IMPORTACIONES DE LOS MODULOS
import { Router } from 'express';
import usersRouter from './user-router'

// LLAMADO DE FUNCIÓN ROUTER
const rutaPrincipal = Router();

//MAPEO DE RUTAS
rutaPrincipal.use('/', usersRouter);


export default rutaPrincipal;