// IMPORTACIONES DE LOS MODULOS
import fs from "fs/promises"
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// DECLARACION DE RUTAS
const rutaProd = path.resolve(__dirname, '../../productos.json');

class ApiProds {

    async obtenerDatos(){
        const recData = await fs.readFile(rutaProd, 'utf-8')
        return JSON.parse(recData)
    }

    async grabarDatos(productos:any){
        await fs.writeFile(rutaProd, JSON.stringify(productos, null, '\t'));
    }

    async newElement(data:any){
        const prods = await this.obtenerDatos();

        if(!data.title || !data.description || !data.code || !data.thumbnail || !data.price || !data.stock ) throw new Error ("Los campos estan incompletos")
        
        const newProduct = {
            id: uuidv4(),
            timestamp: moment().format("DD/MM/YYYY, HH:mm"),
            title: data.title,
            description: data.description,
            code: data.code,
            thumbnail: data.thumbnail,
            price: data.price,
            stock: data.stock
        }

        prods.push(newProduct)

        await this.grabarDatos(prods);

        return newProduct
    }

    async updateById(id:any, data:any){
        const prods = await this.obtenerDatos();
        
        const indice = prods.findIndex((product: any) => product.id == id);
        
        if(indice < 0) throw new Error ('Producto Inexistente');
        
        if(!data.title || !data.description || !data.code || !data.thumbnail || !data.price || !data.stock ) throw new Error ("Los campos estan incompletos")
        
        const updatedProd = {
            id: id,
            timestamp: moment().format("DD/MM/YYYY, HH:mm"),
            title: data.title,
            description: data.description,
            code: data.code,
            thumbnail: data.thumbnail,
            price: data.price,
            stock: data.stock
        }

        prods.splice(indice, 1, updatedProd);

        await this.grabarDatos(prods);

        return updatedProd
    }

    async getById(id:any){
        const prods = await this.obtenerDatos();
        const busqueda = prods.find((product:any) => product.id == id);
        if (!busqueda) throw new Error ('Producto Inexistente');
        return busqueda;
    }

    async deleteById (id:any){
        const prods = await this.obtenerDatos();
        const indice = prods.findIndex((product:any) => product.id == id);
        if(indice < 0) throw new Error ('Producto Inexistente');
        prods.splice(indice, 1);
        return await this.grabarDatos(prods);
    }

}

export const productController = new ApiProds();