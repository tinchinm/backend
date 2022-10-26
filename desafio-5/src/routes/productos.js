const { Router } = require('express');

const { v4: uuidv4 } = require('uuid');

const rutaProductos = Router();

const fs = require('fs/promises');

const path = require('path');
const { setTimeout } = require('timers/promises');
const ruta = path.resolve(__dirname, '../../productos.json');
  

//      GET ALL
rutaProductos.get('/', async (req, res) => {
    const getData = await fs.readFile(ruta, 'utf-8')
    const data = JSON.parse(getData)
    res.json(
    data
    )
});

//      GET BY ID
rutaProductos.get('/:id', async (req, res) => {
    const getData = await fs.readFile(ruta, 'utf-8')
    const data = JSON.parse(getData)
    const id = req.params.id
    const productoId = data.find((product) => product.id == id);
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
rutaProductos.post('/', async (req, res) => {

	const { title, price, thumbnail } = req.body;

	if(!title || !price || !thumbnail) {
		return res.status(400).json({
			msg: "Los campos estan incompletos"
		})
	}

	const nuevoProducto = {
		id: uuidv4(),
        title: title,
		price: price,
		thumbnail:thumbnail
	}

	const getData = await fs.readFile(ruta, 'utf-8');
	const productos = JSON.parse(getData);
	productos.push(nuevoProducto);

	await fs.writeFile(ruta, JSON.stringify(productos, null, '\t'));
	
	res.redirect('back')

});

//      PUT
rutaProductos.put('/:id', async (req, res) => {
	const id = req.params.id;
	const { title, price, thumbnail } = req.body;

	const getData = await fs.readFile(ruta, 'utf-8');
	const productos = JSON.parse(getData);

	const indice = productos.findIndex(product => product.id == id);

	if(indice < 0){
        return res.status(400).json({
            msg:'ID no encontrado'
        })
    }

	if(!title || !price || !thumbnail) {
		return res.status(400).json({
			msg: "Los campos estan incompletos"
		})
	}

	const productoActualizado = {
		id: productos[indice].id,
		title: title,
		price: price,
		thumbnail:thumbnail
	}

	productos.splice(indice, 1, productoActualizado);

	await fs.writeFile(ruta, JSON.stringify(productos, null, '\t'));

	res.json({
		msg: `Se modifico correctamente el producto con id ${id}`,
		data: productoActualizado,
	})
});

//      DELETE
rutaProductos.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const getData = await fs.readFile(ruta, 'utf-8');
	const productos = JSON.parse(getData);

	const indice = productos.findIndex(product => product.id == id);

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


module.exports = rutaProductos;