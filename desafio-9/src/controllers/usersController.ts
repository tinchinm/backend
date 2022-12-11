import { Request, Response } from "express";
import { UsersModel } from "../models/users.model";

//FUNCION QUE TRAE LOS USUARIOS DE LA BASE DE DATOS
const getUsers = async () => {
    try {
      const users = await UsersModel.find();
    
      return users

    } catch (error) {
      console.log(error);
    }
  };

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

//RENDER DEL HOME
export const home = async (req: Request, res: Response) => {
	res.render('index');
}

//RENDER DEL HOME LOGUEADO
export const homeIn = async (req: Request, res: Response) => {
	res.render('home',{nombre:req.session.info?.firstname});
}

//FUNCION PARA LOGUEARSE
export const login = async (req:Request, res:Response) => {

    const { username, password } = req.body;

    //CARGA DE LA LISTA DE USUARIOS EN UNA CONSTANTE
    const users:any = await getUsers();
   
    const index = users.findIndex((user:any) => user.username === username && user.password === password);

    if(index < 0)
      res.status(401).json({ msg: 'USUARIO INEXISTENTE O NO AUTORIZADO' });
    else {
      const user = users[index];
      //INFORMACION PARA GRABAR EN SESSION
      req.session.info = {
        loggedIn: true,
        username : user.username,
        admin : user.admin,
        firstname: user.firstname,
      };
      res.redirect('/home')
    }
}

//FUNCION PARA DESLOGUEARSE
export const logout = (req:Request, res:Response) => {
  const nombre = req.session.info?.firstname;
  req.session.destroy((error) => {
        if(nombre){
            res.render('logout',{nombre:nombre});
        } else {
            res.redirect('/')
        }
    });
}

// INFORMACION DE LA SESSION
export const infoSession = (req:Request, res:Response) => {
    res.send({
      session: req.session,
      sessionId: req.sessionID,
      cookies: req.cookies,
    });
}

