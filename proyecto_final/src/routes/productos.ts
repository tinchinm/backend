// IMPORTACIONES DE LOS MODULOS
import { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import config from '../config/config';
import moment from 'moment';

// LLAMADO DE FUNCIÓN ROUTER
const rutaProductos = Router();

// RUTA DONDE SE ENCUENTRAN LOS DATOS
const ruta = path.resolve(__dirname, '../../productos.json');

//VALIDACION DE PERMISOS DE ADMINISTRADOR
const admin = (req: Request, res: Response, next: NextFunction) => {
    if (!config.administrador) {
        return res.status(401).json({
            msj: "No se encuentra autorizado para esta acción"
        })
    }
    next();
}

//      GET ALL
rutaProductos.get('/', async (req: Request, res: Response) => {
    const getData = await fs.readFile(ruta, 'utf-8')
    const data = JSON.parse(getData)
    res.json(
    data
    )
});

//      GET BY ID
rutaProductos.get('/:id', async (req: Request, res: Response) => {
    const getData = await fs.readFile(ruta, 'utf-8')
    const data = JSON.parse(getData)
    const id = req.params.id
	
    const productoId = data.find((producto:any) => producto.id == id);
    if (!productoId){
        return res.status(400).json({
            msg:'ID no encontrado'
        })
    }else{
    res.json(
    productoId
    )
    }
});

//      POST
rutaProductos.post('/',  admin , async (req: Request, res: Response) => {

	const { title, description, code, thumbnail, price, stock  } = req.body;

	if(!title || !description || !code || !thumbnail || !price || !stock ) {
		return res.status(400).json({
			msg: "Los campos estan incompletos"
		})
	}

	const nuevoProducto = {
		id: uuidv4(),
		timestamp: moment().format("DD/MM/YYYY, HH:mm"),
        title: title,
		description: description,
		code: code,
		thumbnail:thumbnail,
		price: price,
		stock: stock
	}

	const getData = await fs.readFile(ruta, 'utf-8');
	const productos = JSON.parse(getData);
	productos.push(nuevoProducto);

	await fs.writeFile(ruta, JSON.stringify(productos, null, '\t'));

	res.json({
		msg: 'Se ha cargado correctamente el siguiente producto:',
		data: nuevoProducto
	})
});

//      PUT
rutaProductos.put('/:id',  admin , async (req: Request, res: Response) => {
	const id = req.params.id;
	const { title, description, code, thumbnail, price, stock  } = req.body;

	const getData = await fs.readFile(ruta, 'utf-8');
	const productos = JSON.parse(getData);

	const indice = productos.findIndex((product: any) => product.id == id);

	if(indice < 0){
        return res.status(400).json({
            msg:'ID no encontrado'
        })
    }

	if(!title || !description || !code || !thumbnail || !price || !stock ) {
		return res.status(400).json({
			msg: "Los campos estan incompletos"
		})
	}

	const productoActualizado = {
		id: productos[indice].id,
		timestamp: moment().format("DD/MM/YYYY, HH:mm"),
		title: title,
		description: description,
		code: code,
		thumbnail:thumbnail,
		price: price,
		stock: stock
	}

	productos.splice(indice, 1, productoActualizado);

	await fs.writeFile(ruta, JSON.stringify(productos, null, '\t'));

	res.json({
		msg: `Se modifico correctamente el producto con id ${id}`,
		data: productoActualizado,
	})
});

//      DELETE
rutaProductos.delete('/:id',  admin , async (req: Request, res: Response) => {
	const id = req.params.id;
	const getData = await fs.readFile(ruta, 'utf-8');
	const productos = JSON.parse(getData);

	const indice = productos.findIndex((product:any) => product.id == id);

	if(indice < 0){
        return res.status(400).json({
            msg:'ID no encontrado'
        })

    } else {

        productos.splice(indice, 1);
        await fs.writeFile(ruta, JSON.stringify(productos, null, '\t'));

        res.json({
            msg: `Se ha eliminado el producto con ID: ${id}`,
        })

    }
})


export default rutaProductos;