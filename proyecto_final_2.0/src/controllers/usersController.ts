// IMPORTACION DE MODULOS
import passport from "passport";
import { UsersModel } from "../models/users.model";
import { Request, Response, NextFunction } from "express";
import { sendMailRegister } from "./mail.controller";

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
export const register = async (req:Request, res:Response) => {

  const {name, address, phone, mail, username, password, avatar} = req.body

  try {
        
    const newUser = new UsersModel({name, address, phone, mail, username, password, avatar});

    await newUser.save();

    await sendMailRegister(mail,name);
    
    return res.json(newUser)

  } catch (error) {
      
      return res.json({ message: 'Ha ocurrido un error' });
  }
}

// LOGUEAR USUARIO
export const login = (req:Request, res:Response) => {
  
  res.redirect('/home')
}