import { getAll, getById, save, updateById, deleteById } from "../persistence/repository/products.repository";

export const getAllController = async () => {
    const products = await getAll();
    return products
}

export const getByIdController = async (args:any) => {
    const { id } = args
    
    const product = await getById(id);
    return product
}

export const saveController = async ({data}:any) => {
    const datos = {...data}

    const product = await save(datos);
    return product
}

export const updateByIdController = async (args:any, {data}:any) => {
    const { id } = args 
    const datos = {...data}

    const products = await updateById(id, datos);
    return products
}

export const deleteByIdController = async (args:any) => {
    const { id } = args

    const products = await deleteById(id);
    return products
}