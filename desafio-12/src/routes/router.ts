// IMPORTACIONES DE LOS MODULOS
import { Router } from 'express';
import config from '../config/config';
import clusterRouter from './cluster.router';
import forkRouter from './fork.router';

// LLAMADO DE FUNCIÓN ROUTER
const rutaPrincipal = Router();

//MAPEO DE RUTAS
if (config.MODO == 'CLUSTER'){
    
    rutaPrincipal.use('/', clusterRouter );

}else if (config.MODO == 'FORK'){

    rutaPrincipal.use('/', forkRouter );
}

export default rutaPrincipal;