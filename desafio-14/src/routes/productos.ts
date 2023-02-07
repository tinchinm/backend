// IMPORTACIONES DE LOS MODULOS
import { Router } from 'express';
import { getAllController, saveController, updateByIdController, deleteByIdController } from '../controllers/productos.controller';

// LLAMADO DE FUNCIÓN ROUTER
const rutaProductos = Router();

//      GET ALL
rutaProductos.get('/', getAllController );

//      POST
rutaProductos.post('/', saveController );

//      PUT
rutaProductos.put('/:id', updateByIdController );

//      DELETE
rutaProductos.delete('/:id', deleteByIdController )


export default rutaProductos;