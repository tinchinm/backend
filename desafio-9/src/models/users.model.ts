// IMPORTACIONES DE LOS MODULOS
import mongoose from "mongoose";

// NOMBRE DE LA COLECCION EN UNA VARIABLE
export const usersCollectionName = 'users'

// DEFINICION DEL ESQUEMA PARA LA DB
const usersSchema = new mongoose.Schema({
    firstname:{type: String, required: true},
    lastname:{type: String, required: true},
    username:{type: String, required: true},
    password:{type: String, required: true},
    admin:{type: Boolean, required: true}
})

//EXPORTACION DEL ESQUEMA PARA USO
export const UsersModel = mongoose.model(usersCollectionName, usersSchema)