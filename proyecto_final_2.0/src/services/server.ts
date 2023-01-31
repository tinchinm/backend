// IMPORTACIONES DE LOS MODULOS
import express from "express";
import session from 'express-session';
import mainRouter from "../routes/router";
import 'dotenv/config'
import { StoreOptions } from "../config/sessions.config";
import path from "path";
import passport from "passport";
import { loginFunc, registerFunc } from "./autentication";

// CARGA DE EXPRESS
const app = express();

// CONFIGURACION PARA RECIBIR DATOS JSON O FORM
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ENRUTAMIENTO DE LA CARPETA PUBLIC
app.use(express.static('public'));

// CONFIGURACION DE EJS
const viewsPath = path.resolve(__dirname, '../views');
app.set('view engine', 'ejs');
app.set('views', viewsPath);

// CONFIGURACIONES DE SESSION
app.use(session(StoreOptions));

// CONFIGURACIONES PASSPORT
app.use(passport.initialize());
app.use(passport.session());

passport.use('register', registerFunc);
passport.use('login', loginFunc);

// ROUTER 
app.use('/', mainRouter );

export default app;