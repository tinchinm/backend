// IMPORTACION DE MODULOS
import passport from "passport";
import { Request, Response, NextFunction } from "express";

// REGISTRAR USUARIO
export const register = (req:Request, res:Response, next:NextFunction) => {
    
  passport.authenticate('register', (err, user, info) =>{
    console.log('info');
    
    if (err) { return next(err)}

    if (!user) { res.json(info) }

    res.json({msg:'Usuario registrado con éxito'})

  })
}

// LOGUEAR USUARIO
export const login = (req:Request, res:Response) => {
  
  res.json({msg:'Usuario logueado exitosamente', user : req.user})
}

export const getHome = (req:Request, res:Response) => {
  res.json(req.session)
}