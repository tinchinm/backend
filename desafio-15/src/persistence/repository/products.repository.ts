import { asDto } from "../dto/products.dto";
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

export const getById = async (id:any) => {
    const product = await dao.getById(id);
    const prodDTO = asDto(product);
    return prodDTO;
}

export const updateById = async (id:any, data:any) => {
    const product = await dao.updateById(id, data);
    return product;
}

export const deleteById = async (id:any) => {
    const product = await dao.deleteById(id);
    return product;
}