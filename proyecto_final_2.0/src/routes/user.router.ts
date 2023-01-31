//IMPORTACION DE MODULOS
import passport from 'passport';
import { Router } from 'express';
import { login, register, home, registration, homeIn } from '../controllers/usersController';
import { loggedIn } from '../middlewares/validations';

// LLAMADO DE FUNCIÓN ROUTER
const usersRouter = Router();

usersRouter.get('/', home);

usersRouter.get('/home', loggedIn, homeIn);

usersRouter.get('/register', registration )

usersRouter.post('/register', register )

usersRouter.post('/login', passport.authenticate('login'), login)

export default usersRouter