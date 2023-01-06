// IMPORTACIONES DE LOS MODULOS
import express from "express";
import mainRouter from "../routes/router";
import config from '../config/config';
import cluster from 'cluster';
import os from 'os';

// CARGA DE EXPRESS
const app = express();

//CLUSTERIZACION
export const nucleos = os.cpus().length;

const modo = config.MODO

console.log(`Server funcionando en modo ${modo}`);

if ( modo == "CLUSTER" ){
    if(cluster.isPrimary) {
        console.log(`Procesos en paralelo: ${nucleos}`);
        console.log(`PID Principal= ${process.pid}`);
        for (let i = 0; i < nucleos; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code) => {
            console.log(`Worker ${worker.process.pid} genero un error de código: ${code}`);
            cluster.fork();
        })
    }else{
        app.use('/', mainRouter );

        app.listen(config.PUERTO , () => {
            console.log(`Servidor HTTP escuchando en el puerto ${ config.PUERTO } con PID: ${process.pid}`);
        });
        app.on('error', (error) => console.log(`Error en servidor ${error}`));
    }

}else if( modo == "FORK" ){
    
    app.use('/', mainRouter );

    app.listen(config.PUERTO , () => {
        console.log(`Servidor HTTP escuchando en el puerto ${ config.PUERTO } con PID: ${process.pid}`);
    });
    app.on('error', (error) => console.log(`Error en servidor ${error}`));

}