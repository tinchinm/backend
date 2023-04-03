import { asDto } from "../dto/productos.dto";
import { getDao } from "../daos/factory";

const dao = getDao();

export const save = async (data:any) => {
    return await dao.save(data);
}

export const getAll = async () => {
    const products = await dao.getAll();
    const prodsDTO = asDto(products);
    return prodsDTO;
}

export const getById = async (id:String) => {
    const product = await dao.getById(id);
    const prodDTO = asDto(product);
    return prodDTO;
}

export const updateById = async (id:String, data:any) => {
    const product = await dao.updateById(id, data);
    return product;
}

export const deleteById = async (id:String) => {
    const product = await dao.deleteById(id);
    return product;
}