import fs from 'fs';
import path from 'path';

const pathProd = path.resolve(__dirname, './DB.json');

export const getAll = async () => {
    try {
        if (fs.existsSync(pathProd)){
            const data = await fs.promises.readFile(pathProd, 'utf-8')
            return JSON.parse(data)
        }else{
            return[];
        }
        
    } catch (error) {
        console.log(error);
    }
}

export const save =async (data:any) => {
    const prods = await getAll();
    prods.push(data);
    await fs.promises.writeFile(pathProd,JSON.stringify(prods, null, '\t'))
    return data;
}

export const getById = async (id:any) =>{
    const prods = await getAll();
    const busqueda = prods.find((product:any) => product.id == id);
    if (!busqueda) throw new Error ('Producto Inexistente');
    return busqueda;
}

export const updateById = async (id:any, data:any) => {
    
    const { title, description, code, thumbnail, price, stock } = data

    const prods = await getAll();
    
    const indice = prods.findIndex((product: any) => product.id == id);
    
    if(indice < 0) throw new Error ('Producto Inexistente');
    
    if(!title || !description || !code || !thumbnail || !price || !stock ) throw new Error ("Los campos estan incompletos")
    
    const updatedProd = {
        id: id,
        title: data.title,
        description: data.description,
        code: data.code,
        thumbnail: data.thumbnail,
        price: data.price,
        stock: data.stock
    }

    prods.splice(indice, 1, updatedProd);

    await save(prods);

    return updatedProd
}

export const deleteById = async  (id:any) =>{
    const prods = await getAll();
    const indice = prods.findIndex((product:any) => product.id == id);
    if(indice < 0) throw new Error ('Producto Inexistente');
    prods.splice(indice, 1);
    await save(prods);
    return prods
}