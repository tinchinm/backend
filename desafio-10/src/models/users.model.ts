// IMPORTACIONES DE LOS MODULOS
import mongoose from "mongoose";
import bcrypt from "bcryptjs"

// NOMBRE DE LA COLECCION EN UNA VARIABLE
export const usersCollectionName = 'users'

// DEFINICION DEL ESQUEMA PARA LA DB
const usersSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    admin:{type: Boolean, default:false}
})

//ENCRIPTACION DE CONTRASEÑAS
usersSchema.methods.cryptPass = async ( password : string ) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

usersSchema.methods.matchPass = async function( password : string ) {
    return await bcrypt.compare(password, this.password);
};

//EXPORTACION DEL ESQUEMA PARA USO
export const UsersModel = mongoose.model(usersCollectionName, usersSchema)