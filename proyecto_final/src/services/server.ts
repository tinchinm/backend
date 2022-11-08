// IMPORTACIONES DE LOS MODULOS
import express, { Request, Response, NextFunction} from "express";
import mainRouter from "../routes/router";

// CARGA DE EXPRESS
const app = express();

// CONFIGURACION PARA RECIBIR DATOS JSON O FORM
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ENRUTAMIENTO DE LA CARPETA PUBLIC
app.use(express.static('public'));

// ROUTER 
app.use('/api', mainRouter );

export default app;