import express, { Express } from "npm:express"
import mainRouter from '../routes/main-router.ts'

// CARGA DE EXPRESS
const app: Express = express();

// CONFIGURACION PARA RECIBIR DATOS JSON O FORM
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ENRUTAMIENTO
app.use('/', mainRouter);

export default app;