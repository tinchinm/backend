import { Router } from 'express';
import { esAdmin, checkBodyProduct } from '../middlewares/middlewares';
import { getAll, getById, createProduct, updateById, deleteById } from '../controllers/productos.controller';

// LLAMADO DE FUNCIÓN ROUTER
const rutaProductos = Router();

//      GET ALL
rutaProductos.get('/', getAll );

//      GET BY ID
rutaProductos.get('/:id', getById );

//      POST
rutaProductos.post('/',  esAdmin, checkBodyProduct , createProduct );

//      PUT
rutaProductos.put('/:id',  esAdmin, checkBodyProduct, updateById );

//      DELETE
rutaProductos.delete('/:id',  esAdmin, deleteById )

export default rutaProductos;