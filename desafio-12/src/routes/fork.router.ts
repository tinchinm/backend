import { Router, Request, Response }  from 'express';
import path from 'path'
import { fork } from 'child_process';

const forkRouter = Router();

const scriptPath = path.resolve(__dirname, '../utils/calculate');

forkRouter.get('/', (req:Request, res:Response) => {
    console.log(`PID= ${process.pid}`)
    res.json({
        pid: process.pid,
        msg: 'HOLA'
    });
});

forkRouter.get('/randoms', (req: Request, res: Response) => {
    
    const child = fork(scriptPath); //inicializo fork

    child.send (10000000) //envío el comando para que comience el cálculo

    child.on ("message",(array) =>{  //recibo los datos y los muestro en un json
        res.json( array )
    });
} );


export default forkRouter