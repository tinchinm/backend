//IMPORTACION DE MODULOS
import { Router } from 'express';
import { randoms } from '../controllers/apiController';

// LLAMADO DE FUNCIÓN ROUTER
const apiRouter = Router();

apiRouter.get('/randoms', randoms);
apiRouter.get('/randoms/:cant', randoms);

export default apiRouter