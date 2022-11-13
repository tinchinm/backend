// IMPORTACIONES DE LOS MODULOS
import { Request, Response } from 'express';
import { listProds, createProd, updateProd, deleteProd  } from '../../DB/services.productos';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const obtenerDatos = async (req:Request, res:Response) => {
    try {
        const data = await listProds();
        res.json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const getById = async (req:Request, res:Response) => {
    try {
        const data = await listProds({id: req.params.id});
        res.json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const newElement = async (req:Request, res:Response) => {
    try {
        const data = req.body;
        if(!data.title || !data.description || !data.code || !data.thumbnail || !data.price || !data.stock ){
            res.json('Los datos estan incompletos');
        } else {
            const newProduct = {
                id: uuidv4(),
                timestamp: moment().format("DD/MM/YYYY, HH:mm"),
                title: data.title,
                description: data.description,
                code: data.code,
                thumbnail: data.thumbnail,
                price: data.price,
                stock: data.stock
            }
            await createProd(newProduct);
            res.json({
                msg: 'Producto creado satisfactoriamente',
                data: newProduct
            });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

export const updateById = async (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if(!data.title || !data.description || !data.code || !data.thumbnail || !data.price || !data.stock ){
            res.json('Los datos estan incompletos');
        } else {
            const updatedProd = {
                id: id,
                timestamp: moment().format("DD/MM/YYYY, HH:mm"),
                title: data.title,
                description: data.description,
                code: data.code,
                thumbnail: data.thumbnail,
                price: data.price,
                stock: data.stock
            }
            await updateProd(id, updatedProd);
            res.json({
                msg: 'Producto actualizado satisfactoriamente',
                data: updatedProd
            });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

export const deleteById = async (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        await deleteProd(id);
        res.json(`Producto con id ${id} eliminado satisfactoriamente`)
    } catch (error) {
        res.status(400).json(error);
    }
}