import { Request, Response } from "express";
import { getAll, getById, save, updateById, deleteById } from "../persistence/repository/products.repository";

export const getAllController = async (req:Request, res:Response) => {
    try {
        const products = await getAll();
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}

export const getByIdController = async (req:Request, res:Response) => {
    const { id } = req.params
    try {
        const product = await getById(id);
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}

export const saveController = async (req:Request, res:Response) => {
    const data = req.body;
    try {
        const product = await save(data);
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}

export const updateByIdController = async (req:Request, res:Response) => {
    const { id } = req.params 
    const data:any = req.body;
    try {
        const products = await updateById(id, data);
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}

export const deleteByIdController = async (req:Request, res:Response) => {
    const { id } = req.params 
    try {
        const products = await deleteById(id);
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}