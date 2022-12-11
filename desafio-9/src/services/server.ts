// IMPORTACIONES DE LOS MODULOS
import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mainRouter from "../routes/router";
import 'dotenv/config'
import { StoreOptions } from "../config/sessions";
import path from "path";

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

// CONFIGURACIONES DE SESIONES Y COOKIES
app.use(cookieParser());
app.use(session(StoreOptions));

// ROUTER 
app.use('/', mainRouter );

export default app;