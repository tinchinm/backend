import { asDto } from "../dto/products.dto";
import { getDao } from "../daos/factory";

const dao = getDao();

/* export default class ProductRepository {
    dao:any;
    constructor() {
        this.dao = getDao();
    }

    async save (data:any) {
        const product = await this.dao.save(data);
        return product;
    }

    async getAll() {
        const products = await this.dao.getAll();
        const prodsDTO = asDto(products);
        return prodsDTO;
    }

    async getById(id:any) {
        const product = await this.dao.getById(id);
        const prodDTO = asDto(product);
        return prodDTO;
    }

    async updateById(id:any) {
        const product = await this.dao.updateById(id);
        return product;
    }

    async deleteById(id:any) {
        const product = await this.dao.deleteById(id);
        return product;
    }
} */


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