import { Router, Request, Response }  from 'express';
import path from 'path'
import { fork } from 'child_process';
import compression from 'compression';
import { log } from "../config/logs.config";
import { nucleos } from '../services/server';

const forkRouter = Router();

const scriptPath = path.resolve(__dirname, '../utils/calculate');

forkRouter.get('/', (req:Request, res:Response) => {
    log.info(`PID= ${process.pid}`)
    res.json({
        pid: process.pid,
        msg: 'HOLA'
    });
});

forkRouter.get('/info', (req:Request, res:Response) => {
    res.json({
        pid: process.pid,
        nucleos: nucleos,
        msg: 'HOLA'
    });
    log.info(`Process ID: ${process.pid}
    Cant de Nucleos: ${nucleos}
    Mensaje generado por Winston`);
    
});

forkRouter.get('/infocl', (req:Request, res:Response) => {
    res.json({
        pid: process.pid,
        nucleos: nucleos,
        msg: 'HOLA'
    });
    console.log(`Process ID: ${process.pid}
    Cant de Nucleos: ${nucleos}
    Mensaje generado por Console Log`);
    
});

forkRouter.get('/randoms', (req: Request, res: Response) => {
    
    const child = fork(scriptPath); //inicializo fork

    child.send (10000000) //envío el comando para que comience el cálculo

    child.on ("message",(array) =>{  //recibo los datos y los muestro en un json
        res.json( array )
    });
} );

forkRouter.get('/randomszip', compression() ,(req: Request, res: Response) => {
    
    const child = fork(scriptPath); //inicializo fork

    child.send (10000000) //envío el comando para que comience el cálculo

    child.on ("message",(array) =>{  //recibo los datos y los muestro en un json
        res.json( array )
    });
} );


export default forkRouter