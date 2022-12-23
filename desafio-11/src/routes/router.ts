// IMPORTACIONES DE LOS MODULOS
import { Router } from 'express';
import usersRouter from './user-router'
import apiRouter from './api-router';

// LLAMADO DE FUNCIÓN ROUTER
const rutaPrincipal = Router();

//MAPEO DE RUTAS
rutaPrincipal.use('/', usersRouter);
rutaPrincipal.use('/api', apiRouter);


export default rutaPrincipal;