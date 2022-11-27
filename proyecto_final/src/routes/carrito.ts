// IMPORTACIONES DE LOS MODULOS
import { Router } from 'express';
import { getById, createChart, deleteById, addToChart, deleteFromChart } from '../controllers/carrito.controller';

// LLAMADO DE FUNCIÓN ROUTER
const rutaCarrito = Router();

// POST Y CREACION DE CARRITO
rutaCarrito.post('/', createChart);

// BORRADO DE UN CARRITO
rutaCarrito.delete('/:id', deleteById)

// MOSTRAR LOS PRODUCTOS QUE HAY EN UN CARRITO POR ID
rutaCarrito.get('/:id/productos', getById);

// POST DE PRODUCTOS A CARRITO
rutaCarrito.post('/:id/productos/:id_prod', addToChart);

// DELETE DE UN PRODUCTO DENTRO DE UN CARRITO

rutaCarrito.delete('/:id/productos/:id_prod', deleteFromChart);

export default rutaCarrito