// IMPORTACIONES DE LOS MODULOS
import { Request, Response, NextFunction } from "express";

//INTERFACES PARA TS
interface SessionInfo {
    loggedIn: boolean;
    username : string;
    firstname : string;
    admin : boolean;
  }
  declare module 'express-session' {
    interface SessionData {
      info: SessionInfo;
    }
  }

//VALIDACION DE LOGUEO CORECTO
export const loggedIn = (req:Request, res:Response, next:NextFunction) => {
    if (req.session.info?.loggedIn === true) next();
    else res.status(401).json({ msg: 'Por favor logueate primero' });
  };