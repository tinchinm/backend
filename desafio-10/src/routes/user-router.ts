//IMPORTACION DE MODULOS
import passport from 'passport';
import { Router } from 'express';
import { login, register, getHome } from '../controllers/usersController';
import { loggedIn } from '../middlewares/validations';

// LLAMADO DE FUNCIÓN ROUTER
const usersRouter = Router();

usersRouter.post('/register', register )

usersRouter.post('/login', passport.authenticate('login'), login)

usersRouter.get('/home', loggedIn, getHome);

export default usersRouter