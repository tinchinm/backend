const fs = require('fs');
const path = require('path');

const ruta = './productos.txt'

class Acciones {

    async getAll(){
        const data = await fs.promises.readFile(ruta,'utf-8');
        return JSON.parse(data);
    }

    async actualizarArchivo(productos){
        fs.promises.writeFile(ruta, JSON.stringify(productos, null, '\t'), 'utf-8');
    }

    async save(data){
        if(!data.title || !data.price || typeof data.price !== 'number') throw new Error('Datos incorrectos');
        let id = 1;
        const productos =   await this.getAll();
       if(productos.length){
          id = productos[productos.length -1].id +1;
       }
        const nuevoProducto = {
            title: data.title,
            price: data.price,
            id: id
        }
        productos.push(nuevoProducto);
        console.log(`se agrego ${nuevoProducto.title} con el id: ${nuevoProducto.id}`);
        return await this.actualizarArchivo(productos);
    }

    async getById(id){
        const productos = await this.getAll();
        const busqueda  = productos.find((dato) => dato.id === id);
        console.log(`El producto con id ${id} es:`);
        console.log(busqueda);
        return busqueda;
    }

    async deleteById(id){
        const productos = await this.getAll();
        productos.splice(id - 1,1);
        console.log(`Se removio el producto con el id:${id}`);
        return await this.actualizarArchivo(productos);
    }

    async deleteAll(){
        const productos = await this.getAll();
        productos.splice(0);
        console.log('Se ha vaciado la lista de productos');
        return await this.actualizarArchivo(productos);
    }
}


const ejecutar = async() =>{
    const productos = new Acciones()

    console.log("1- Muestro el conternido del Array");
    const getAll = await productos.getAll();
    console.log(getAll);
    console.log("\n");


    console.log("2- Agregado de productos");
    const save = await productos.save({
        title: 'Libro',
        price: 134
    });
    console.log("\n");


    console.log("3- Buscar un producto por id");
    const searchId = await productos.getById(2);
    console.log("\n");


    console.log("4- Borrar un producto por id");
    const eraseId = await productos.deleteById(2);
    console.log("\n");
    

    console.log("5- Vaciar Array completo");
    const eraseAll = await productos.deleteAll();
    console.log("\n");
  
}

ejecutar();