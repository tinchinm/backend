import * as DaoFile from './filesystem/filesystem'
import * as DaoMongoDB from './mongo/mongodb'
import { initMongoDB } from './mongo/mongodb'

let dao:any;

let option = process.env.PERSISTENCE;

switch(option) {
    case 'file':
        dao = DaoFile;
        break;
    case 'mongo':
        initMongoDB();
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

export function getDao () {
    return dao
};