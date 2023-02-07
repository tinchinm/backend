// IMPORTACION DE MODULOS
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UsersModel } from "../models/users.model";

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