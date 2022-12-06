// IMPORTACIONES DE LOS MODULOS
import { Router, Request, Response } from 'express';

//IMPORTACION DEL MOCK SERVER
import { createRandomProducts } from "../utils/mock.server";

// LLAMADO DE FUNCIÓN ROUTER
const rutaProductosTest = Router();

//      GET ALL
rutaProductosTest.get('/', async (req: Request, res: Response) => {
	try {
		let data = await createRandomProducts();
    	res.json(data)
	} catch (error) {
		console.error(error)
	}
});

export default rutaProductosTest;