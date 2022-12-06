// IMPORTACIONES DE LOS MODULOS
import { Router, Request, Response } from 'express';
import { esAdmin } from '../middlewares/middlewares';
import { productController } from '../controllers/productos.controller';

// LLAMADO DE FUNCIÓN ROUTER
const rutaProductos = Router();

//      GET ALL
rutaProductos.get('/', async (req: Request, res: Response) => {
	try {
		let data = await productController.obtenerDatos();
    	res.json(data)
	} catch (error) {
		console.error(error)
	}
});

//      GET BY ID
rutaProductos.get('/:id', async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const dataId = await productController.getById(id);
		res.json(dataId)
	} catch (error) {
		console.error(error)
	}
});

//      POST
rutaProductos.post('/',  esAdmin , async (req: Request, res: Response) => {
	try {
		const dataProd = req.body;	
		const dataP = await productController.newElement(dataProd);
		res.json({
			msg: 'Se ha cargado correctamente el siguiente producto:',
			data: dataP
		})
	} catch (error) {
		console.error(error)
	}
});

//      PUT
rutaProductos.put('/:id',  esAdmin , async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const data = req.body;
		const modProd = await productController.updateById(id, data);
		res.json({
			msg: `Se modifico correctamente el producto con id ${id}`,
			data: modProd
		})
	} catch (error) {
		console.error(error)
	}
});

//      DELETE
rutaProductos.delete('/:id',  esAdmin , async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const delProd = await productController.deleteById(id);
		res.json({msg: `Se ha eliminado el producto con ID: ${id}`})
	} catch (error) {
		console.error(error)
	}

})


export default rutaProductos;