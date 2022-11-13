import { Router, Request, Response, NextFunction } from 'express';
import config from '../config/config';

export const esAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!config.administrador) {
        return res.status(401).json({
            msj: "No se encuentra autorizado para esta acción"
        })
    }
    next();
}