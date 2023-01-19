import { Router, Request, Response } from 'express';
import { calculate } from '../utils/calculate';
import { nucleos } from '../services/server';
import compression from 'compression';

const clusterRouter = Router();


clusterRouter.get('/', (req:Request, res:Response) => {
    res.json({
        pid: process.pid,
        msg: 'HOLA'
    });
});

clusterRouter.get('/info', (req:Request, res:Response) => {
    res.json({
        pid: process.pid,
        nucleos: nucleos,
        msg: 'HOLA'
    });
});

clusterRouter.get('/randoms', (req: Request, res: Response) => {

    const calculo = calculate(10000000)

    res.json(calculo)

} );

clusterRouter.get('/randomszip', compression() ,(req: Request, res: Response) => {

    const calculo = calculate(10000000)

    res.json(calculo)

} );

clusterRouter.get('/end', (req: Request, res: Response) => {
    res.json({msg: `Proceso con PID: ${process.pid} finalizado`});
    process.exit(0);
});


export default clusterRouter