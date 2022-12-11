import { Router } from 'express';
import { home, homeIn, login, logout, infoSession } from '../controllers/usersController';
import { loggedIn } from '../middlewares/validations';

// LLAMADO DE FUNCIÓN ROUTER
const usersRouter = Router();

usersRouter.get('/', home);

usersRouter.get('/home', loggedIn, homeIn);

usersRouter.post('/login', login);

usersRouter.get('/logout', logout);

usersRouter.get('/info', infoSession);


export default usersRouter