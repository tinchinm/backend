// IMPORTACIONES DE LOS MODULOS
import mongoose from "mongoose";

// NOMBRE DE LA COLECCION EN UNA VARIABLE
export const productsCollectionName = 'productos'

// DEFINICION DEL ESQUEMA PARA LA DB
const productsSchema = new mongoose.Schema({
    timestamp:{type: String, required: true},
    title:{type: String, required: true},
    description:{type: String, required: true},
    code:{type: Number, required: true},
    thumbnail:{type: String, required: true},
    price:{type: Number, required: true},
    stock:{type: Number, required: true}
})

//EXPORTACION DEL ESQUEMA PARA USO
export const ProductsModel = mongoose.model(productsCollectionName, productsSchema)