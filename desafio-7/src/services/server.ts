// IMPORTACIONES DE LOS MODULOS
import express, { Request, Response } from "express";
import path from "path";

const http = require ('http')

// CARGA DE EXPRESS
const app = express ();

// CONFIGURACION PARA RECIBIR DATOS JSON O FORM
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ENRUTAMIENTO DE LA CARPETA PUBLIC
app.use(express.static('public'));

// DECLARACION DE RUTAS
const viewsPath = path.resolve(__dirname, '../views');

// CONFIGURACION DE EJS
app.set('view engine', 'ejs');
app.set('views', viewsPath);


//ACA ESTAN LOS RENDERIZADOS QUE REALIZA EJS

app.get('/', async (req: Request, res: Response) => {
	res.render('index');
});

//ACA ESTA TODO LO RELACIONADO A SOCKET

const myHTTPServer = http.Server(app)

export default myHTTPServer