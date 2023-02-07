import * as File from './filesystem/filesystem'
import * as MongoDB from './mongo/mongodb'
import { initMongoDB } from './mongo/mongodb'

let persistence:any;

let option = process.env.PERSISTENCE;

switch(option) {
    case 'file':
        persistence = File;
        break;
    case 'mongo':
        initMongoDB();
        persistence = MongoDB;
        break;
}

export async function getAll() {
    return await persistence.getAll();
};

export async function getById(id:any) {
    return await persistence.getById(id);
};

export async function save(id:any) {
    return await persistence.save(id);
};

export async function updateById(id:any, data:any) {
    return await persistence.updateById(id);
};

export async function deleteById(id:any) {
    return await persistence.deleteById(id);
};