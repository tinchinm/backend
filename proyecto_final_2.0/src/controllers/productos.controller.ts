// IMPORTACIONES DE LOS MODULOS
import { Request, Response } from "express";
import { getAll as getAllProds, 
        save, 
        getById as getProdById, 
        updateById as updateProdById, 
        deleteById as deleteProdById } from "../persistence/repository/productos.repository";
import moment from 'moment';

// TRAE TODOS LOS PRODUCTOS DE LA DB
export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await getAllProds();
    res.json({
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// TRAE EL PRODUCTO ESPECIFICADO EN LA ID
export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProdById(id);

    if (!product)
      return res.status(404).json({
        msg: "El producto indicado no existe",
      });

    res.json({
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// CREA UN NUEVO PRODUCTO
export const createProduct = async (req: Request, res: Response) => {
  try {
    const timestamp = moment().format("DD/MM/YYYY, HH:mm");
    const { title, description, code, thumbnail, price, stock } = req.body;

    const newProduct = await save({
      timestamp,
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
    });

    res.status(201).json({
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// ACTUALIZA UN PRODUCTO YA EXISTENTE EN LA DB
export const updateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, code, thumbnail, price, stock } = req.body;
    const timestamp = moment().format("DD/MM/YYYY, HH:mm");

    const productUpdated = await updateProdById(
      id,
      { timestamp, title, description, code, thumbnail, price, stock }
    );

    res.json({
      msg: "Producto Actualizado Correctamente",
      data: productUpdated,
    });

  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// ELIMINA UN PRODUCTO CON LA ID INDICADA
export const deleteById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await deleteProdById(id);

      res.json({
        msg: 'Producto Eliminado Correctamente'
      })
    } catch (error) {
        res.status(500).json({
          error: error,
        });
    }
  };