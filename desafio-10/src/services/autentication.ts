// IMPORTACION DE MODULOS
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UsersModel } from "../models/users.model";

// REGISTRAR USUARIO NUEVO
const register = async ( username:String, password:String, done:Function ) =>{
    try {
        
        const newUser = new UsersModel({username, password});

        newUser.password = await newUser.cryptPass(password)

        await newUser.save();
        
        return done(null, newUser);
  
    } catch (error) {
        
        return done(null, false, { message: 'Ha ocurrido un error' });
    }
}

export const registerFunc = new LocalStrategy( register );

// FUNCION PARA LOGUEARSE
const login = async ( username:String, password:String, done:Function ) =>{
    
    const user = await UsersModel.findOne({username, password});

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