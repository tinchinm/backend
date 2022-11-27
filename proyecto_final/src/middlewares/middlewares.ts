import { Request, Response, NextFunction } from 'express';
import config from '../config/config';

export const esAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!config.administrador) {
        return res.status(401).json({
            msj: "No se encuentra autorizado para esta acción"
        })
    }
    next();
}

export const checkBodyProduct = async (req: Request, res: Response, next: NextFunction) => {
    
    const { title, description, code, thumbnail, price, stock  } = req.body;

	if(!title || !description || !code || !thumbnail || !price || !stock ) {
		return res.status(400).json({
			msg: "Los campos estan incompletos"
		})
	}
    next();
  };
  