// IMPORTACION DE MODULOS
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UsersModel } from "../models/users.model";

// REGISTRAR USUARIO NUEVO
const register = async  ( name:String, address:String, phone:Number, mail:String, username:String, password:String, avatar:String, done:Function ) =>{
    try {
        
        const newUser = new UsersModel({name, address, phone, mail, username, password, avatar});

        await newUser.save();
        
        return done(null, newUser);
  
    } catch (error) {
        
        return done(null, false, { message: 'Ha ocurrido un error' });
    }
}

export const registerFunc = new LocalStrategy( register );

// FUNCION PARA LOGUEARSE
const login = async ( username:String, password:String, done:Function ) =>{
    
    const user = await UsersModel.findOne({username});

    if (!user) {
        return done(null, false, {message: 'Usuario inexistente'})
    }else{
        const match = await user.matchPass(password)
        if (match) {
            done(null, user)
        }else{
            done(null, false)
        }
    }  
}

export const loginFunc = new LocalStrategy( login )
 

// SERIALIZACION Y DESERIALIZACION DE USUARIOS
passport.serializeUser((user:any, done) => {
    done(null, user._id)
});

passport.deserializeUser( async (userId, done) => {
    const user = await UsersModel.findById(userId);
    return done(null, user)
});