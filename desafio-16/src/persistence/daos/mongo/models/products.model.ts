import mongoose from "mongoose";

export const usersCollectionName = 'products'

export const usersSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true},
    stock: {type: String, required: true},
})

//EXPORTACION DEL ESQUEMA PARA USO
export const ProductsModel = mongoose.model(usersCollectionName, usersSchema)
