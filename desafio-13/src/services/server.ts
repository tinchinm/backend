// IMPORTACIONES DE LOS MODULOS
import express from "express";
import mainRouter from "../routes/router";
import config from '../config/config';
import cluster from 'cluster';
import os from 'os';
import { log } from "../config/logs.config";

// CARGA DE EXPRESS
const app = express();

//CLUSTERIZACION
export const nucleos = os.cpus().length;

const modo = config.MODO

log.info(`Server funcionando en modo ${modo}`);

if ( modo == "CLUSTER" ){
    if(cluster.isPrimary) {
        log.info(`Procesos en paralelo: ${nucleos}`);
        log.info(`PID Principal= ${process.pid}`);
        for (let i = 0; i < nucleos; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code) => {
            log.error(`Worker ${worker.process.pid} genero un error de código: ${code}`);
            cluster.fork();
        })
    }else{
        app.use('/', mainRouter );

        app.listen(config.PUERTO , () => {
            log.info(`Servidor HTTP escuchando en el puerto ${ config.PUERTO } con PID: ${process.pid}`);
        });
        app.on('error', (error) => log.error(`Error en servidor ${error}`));
    }

}else if( modo == "FORK" ){
    
    app.use('/', mainRouter );

    app.listen(config.PUERTO , () => {
        log.info(`Servidor HTTP escuchando en el puerto ${ config.PUERTO } con PID: ${process.pid}`);
    });
    app.on('error', (error) => log.error(`Error en servidor ${error}`));

}