//CONEXION A BASE DE DATOS
import db from './dbConnection'

export const listProds = (id={}) => {
    return db('productos')
        .where(id)
        .select('*')
};

export const createProd = (data:any) => {
    return db('productos').insert(data)
}

export const updateProd = (id:any, data:any) => {
    return db('productos').where('id', id).update(data)
}

export const deleteProd = (id:any) => {
    return db('productos').where('id', id).del()
}