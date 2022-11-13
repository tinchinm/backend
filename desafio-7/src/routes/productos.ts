// IMPORTACIONES DE LOS MODULOS
import { Router, Request, Response } from 'express';
import { esAdmin } from '../middlewares/middlewares';
import { obtenerDatos, getById, newElement, updateById, deleteById } from '../controllers/productos.controller';

// LLAMADO DE FUNCIÓN ROUTER
const rutaProductos = Router();

//      GET ALL
rutaProductos.get('/', obtenerDatos );

//      GET BY ID
rutaProductos.get('/:id', getById );

//      POST
rutaProductos.post('/',  esAdmin , newElement );

//      PUT
rutaProductos.put('/:id',  esAdmin , updateById );

//      DELETE
rutaProductos.delete('/:id',  esAdmin , deleteById )

export default rutaProductos;