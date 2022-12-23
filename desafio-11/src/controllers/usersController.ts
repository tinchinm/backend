// IMPORTACION DE MODULOS
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import config from "../config/config";

//RENDER DEL HOME
export const home = async (req: Request, res: Response) => {
	res.render('index');
}

//RENDER DEL REGISTRO
export const registration = async (req: Request, res: Response) => {
	res.render('register');
}

//RENDER DEL HOME LOGUEADO
export const homeIn = async (req: Request, res: Response) => {
	res.render('home');
}

// REGISTRAR USUARIO
export const register = (req:Request, res:Response, next:NextFunction) => {
    
  passport.authenticate('register', (err, user, info) =>{
    
    if (err) { return next(err)}

    if (!user) { res.json(info) }

    res.json({msg:'Usuario registrado con éxito'})

  })(req, res, next)
}

// LOGUEAR USUARIO
export const login = (req:Request, res:Response) => {
  
  res.redirect('/home')
}

//INFORMACION DE ARGUMENTOS
export const info = (req:Request, res:Response) => {
res.json({msg:`
Argumentos de entrada: ${config.ARGUMENTOS}
Nombre de la plataforma: ${process.platform}
Version de NodeJs: ${process.version}
Uso de memoria: ${JSON.stringify(process.memoryUsage())}
Path de ejecución: ${process.title}
Carpeta del proyecto: ${process.cwd()}
Process ID: ${process.pid}
`})
}