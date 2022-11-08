// IMPORTACIONES DE LOS MODULOS
import { Router, Request, Response } from 'express';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import moment from 'moment';

// LLAMADO DE FUNCIÓN ROUTER
const rutaCarrito = Router();

// RUTA DONDE SE ENCUENTRAN LOS DATOS
const ruta      = path.resolve(__dirname, '../../carrito.json');
const rutaProds = path.resolve(__dirname, '../../productos.json');

// POST Y CREACION DE CARRITO
rutaCarrito.post('/', async (req: Request, res: Response) => {

	const nuevoCarrito = {
		id: uuidv4(),
		timestamp: moment().format("DD/MM/YYYY, HH:mm"),
        productos: []
	}

	const getData = await fs.readFile(ruta, 'utf-8');
	const carrito = JSON.parse(getData);
	carrito.push(nuevoCarrito);

	await fs.writeFile(ruta, JSON.stringify(carrito, null, '\t'));

	res.json({
		msg: `Se ha creado un nuevo carrito con el id: ${nuevoCarrito.id}`,
	})
});

// BORRADO DE UN CARRITO
rutaCarrito.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	const getData = await fs.readFile(ruta, 'utf-8');
	const carrito = JSON.parse(getData);

	const indice = carrito.findIndex((carro:any) => carro.id == id);

	if(indice < 0){
        return res.status(400).json({
            msg:'ID no encontrado'
        })

    } else {

        carrito.splice(indice, 1);
        await fs.writeFile(ruta, JSON.stringify(carrito, null, '\t'));

        res.json({
            msg: `Se ha eliminado el carrito con ID: ${id}`,
        })

    }
})

//      GET BY ID
rutaCarrito.get('/:id/productos', async (req: Request, res: Response) => {
    const getData = await fs.readFile(ruta, 'utf-8')
    const data = JSON.parse(getData)
    const id = req.params.id
    const carritoId = data.find((carro:any) => carro.id == id);
    if (!carritoId){
        return res.status(400).json({
            msg:'ID no encontrado'
        })
    }else{
    res.json(
    carritoId.productos
    )
    }
});

// POST DE PRODUCTOS A CARRITO
rutaCarrito.post('/:id/productos/:id_prod', async (req: Request, res: Response) => {

	//OBTENGO LOS ID
	const id      = req.params.id;
	const id_prod = req.params.id_prod;

	//LLAMO AL CARRITO POR ID Y BUSCO EL INDICE
	const getData = await fs.readFile(ruta, 'utf-8')
    const data = JSON.parse(getData)
    const carritoId = data.find((carro:any) => carro.id == id);
	const indice = data.findIndex((carro: any) => carro.id == id);

	//VALIDO QUE SE HAYA TRAIDO UN CARRITO
	if (!carritoId){
        return res.status(400).json({
            msg:'El carrito seleccionado no existe'
        })
	}

	//LLAMO AL PRODUCTO POR ID
	const getDataProd = await fs.readFile(rutaProds, 'utf-8')
    const dataProd = JSON.parse(getDataProd)
    const productoId = dataProd.find((product:any) => product.id == id_prod);

	//VALIDO QUE SE HAYA TRAIDO UN PRODUCTO
	if (!productoId){
        return res.status(400).json({
            msg:'El producto seleccionado no existe'
        })
	}

	//PUSHEO PRODUCTO NUEVO EN EL CARRITO
	carritoId.productos.push(productoId)

	//REEMPLAZO EL CARRITO CON EL NUEVO ACTUALIZADO
	data.splice(indice, 1, carritoId);

	//REESCRIBO EL ARCHIVO CON LOS DATOS NUEVOS
	await fs.writeFile(ruta, JSON.stringify(data, null, '\t'));

	//RESPUESTA EXITOSA
	res.json({
		msg: `Se agregó correctamente ${productoId.title} a su carrito`,
	})
	
});

// DELETE DE UN PRODUCTO DENTRO DE UN CARRITO

rutaCarrito.delete('/:id/productos/:id_prod', async (req: Request, res: Response) => {

	//OBTENGO LOS ID
	const id      = req.params.id;
	const id_prod = req.params.id_prod;

	//LLAMO AL CARRITO POR ID
	const getData = await fs.readFile(ruta, 'utf-8')
    const data = JSON.parse(getData)
    const carritoId = data.find((carro:any) => carro.id == id);

	//VALIDO QUE SE HAYA TRAIDO UN CARRITO
	if (!carritoId){
        return res.status(400).json({
            msg:'El carrito seleccionado no existe'
        })
	}

	//BUSCO EL PRODUCTO DENTRO DEL CARRITO Y SU INDICE
	const prod = carritoId.productos.find((producto:any) => producto.id == id_prod);
	const indice = carritoId.productos.findIndex((producto: any) => producto.id == id_prod);

	//VALIDO QUE SE HAYA ENCONTRADO UN PRODUCTO
	if (!prod){
        return res.status(400).json({
            msg:'El producto seleccionado no existe'
        })
	}

	//BORRO EL PRODUCTO
	carritoId.productos.splice(indice, 1);

	//REESCRIBO EL ARCHIVO CON LOS DATOS NUEVOS
	await fs.writeFile(ruta, JSON.stringify(data, null, '\t'));

	//RESPUESTA EXITOSA
	res.json({
		msg: `Se ha eliminado el producto con ID: ${id_prod} de su carro`,
	});

});


export default rutaCarrito