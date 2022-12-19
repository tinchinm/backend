// IMPORTACIONES DE LOS MODULOS
import { Request, Response, NextFunction } from "express";

//VALIDACION DE LOGUEO CORECTO
export const loggedIn = (req:Request, res:Response, next:NextFunction) => {
    
    if(!req.isAuthenticated()) return res.status(401).json({msg: 'Por favor logueate primero'});
    
    next();
  };