// IMPORTACIONES DE LOS MODULOS
import { normalize, schema, denormalize } from 'normalizr';
import { Request, Response } from 'express';
import { mensajesController } from '../controllers/mensajes.controller';
import path from "path";
import fs from "fs/promises"

// DECLARACION DE RUTAS
const rutaMjesNrm = path.resolve(__dirname, '../data/mensajesNormalizados.json');
const rutaMjesDnrm = path.resolve(__dirname, '../data/mensajesDesnormalizados.json');

// DECLARACION DEL ESQUEMA
const user = new schema.Entity('users', {}, { idAttribute: 'email' });

const msge = new schema.Entity('messages', { author: user }, { idAttribute: '_id' });

const msgesSchema = [msge]

// DATA ORIGINAL
export const original = async (req:Request, res:Response) => {
    
    const data = await mensajesController.getMsg();
    
    res.json({
        data
    })
}

// FUNCION NORMALIZAR
export const normalizado = async (req:Request, res:Response) => {
    
    const data = await mensajesController.getMsg();

    const normalizedData = normalize(data, msgesSchema);

    await fs.writeFile(rutaMjesNrm, JSON.stringify(normalizedData, null, '\t'));

    res.json({
        normalizedData
    })
}

// FUNCION DESNORMALIZAR
export const desnormalizado = async (req:Request, res:Response) => {

    const data = await JSON.parse(await fs.readFile(rutaMjesNrm,'utf-8'))

    const denormalizedData = denormalize(data.result, msgesSchema, data.entities)

    await fs.writeFile(rutaMjesDnrm, JSON.stringify(denormalizedData, null, '\t'));

    res.json({
       denormalizedData
    })
}