// IMPORTACIONES DE LOS MODULOS
import {model, Schema, Document} from "mongoose";
import bcrypt from "bcryptjs"

// INTERFACE TYPESCRIPT
export interface IUser extends Document {
    username: string;
    password: string;
    matchPass: (password:any) => Promise<boolean>;
}

// NOMBRE DE LA COLECCION EN UNA VARIABLE
export const usersCollectionName = 'users'

// DEFINICION DEL ESQUEMA PARA LA DB
const usersSchema = new Schema({
    username:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    admin:{type: Boolean, default:false}
})

//ENCRIPTACION DE CONTRASEÑAS
usersSchema.pre<IUser>('save', async function(next){
    const user = this;  //obtengo los campos del schema user
    if(!user.isModified('password')) return next(); //si el campo password no fue modificado continua
    //si el usuario es nuevo:
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash
    next()
})

usersSchema.methods.matchPass = async function( password : string ) {
    return await bcrypt.compare(password, this.password);
};

//EXPORTACION DEL ESQUEMA PARA USO
export const UsersModel = model<IUser>(usersCollectionName, usersSchema)