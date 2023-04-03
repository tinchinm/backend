import * as DaoFile from './fs/filesystem'
import * as DaoMongoDB from './mongo/mongodb'
import { mongo } from './mongo/mongodb'

let dao:any;

let option = process.env.PERSISTENCE;

switch(option) {
    case 'file':
        dao = DaoFile;
        break;
    case 'mongo':
        mongo.initMongoDB();
        dao = DaoMongoDB;
        break;
}

export async function getAll() {
    return await dao.getAll();
};

export async function getById(id:any) {
    return await dao.getById(id);
};

export async function save(data:any) {
    return await dao.save(data);
};

export async function updateById(id:any, data:any) {
    return await dao.updateById(id);
};

export async function deleteById(id:any) {
    return await dao.deleteById(id);
};

export async function getChart(id:String) {
    return await dao.getChart(id);
};

export async function createChart(userID:String,timestamp:String,products:[]) {
    return await dao.createChart(userID, timestamp, products);
};

export async function deleteChart(id:String) {
    return await dao.deleteChart(id);
};

export async function addToChart(id:String, id_prod:String) {
    return await dao.addToChart(id, id_prod);
};

export async function deleteFromChart(id:String, id_prod:String) {
    return await dao.deleteFromChart(id, id_prod);
};

export async function finCompra(id_chart:String) {
    return await dao.finCompra(id_chart);
};

export async function getAllUsers() {
    return await dao.getAllUsers();
};

export async function register(data:any) {
    return await dao.register(data);
};

export function getDao () {
    return dao
};