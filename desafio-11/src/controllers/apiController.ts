// IMPORTACION DE MODULOS
import { Request, Response } from "express";
import path from 'path'
import { fork } from 'child_process';

// DECLARACION DE RUTAS
const scriptPath = path.resolve(__dirname, '../utils/calculate');

//FUNCION QUE CALCULA NUMEROS
export const randoms = (req: Request, res: Response) => {
    
    let cant:Number = parseInt(req.params.cant); //recibe los datos por params

    if (!cant) { cant = 10000000 }; //si cant no existe, lo declara como diez millones

    const child = fork(scriptPath); //inicializo fork

    child.send (cant) //envío el comando para que comience el cálculo

    child.on ("message",(array) =>{  //recibo los datos y los muestro en un json
        res.json( array )
    });
}
