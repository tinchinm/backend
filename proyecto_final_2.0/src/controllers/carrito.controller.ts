// IMPORTACIONES DE LOS MODULOS
import { Request, Response } from 'express';
import { getChart as getChartCtrl, 
         createChart as createChartCtrl, 
         deleteChart as deleteChartCtrl,
         addToChart as addToChartCtrl, 
         deleteFromChart as deleteFromChartCtrl, 
         finCompra as finCompraCtrl } from '../persistence/repository/carritos.repository';
import moment from 'moment';

// TRAE EL CARRITO INDICADO POR ID
export const getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const chart = await getChartCtrl(id);
  
      if (!chart)
        return res.status(404).json({
          msg: "No existe el carrito seleccionado",
        });
  
      res.json({
        data: chart,
      });

    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  };

// CREA UN NUEVO CARRITO
export const createChart = async (req: Request, res: Response) => {
    try {
      const userID = req.params.userID
      const timestamp = moment().format("DD/MM/YYYY, HH:mm");
      const products:[] = [];
  
      const newProduct = await createChartCtrl(
        timestamp,
        userID,
        products
        
      );
  
      res.status(201).json({
        msg:'Carrito creado satisfactoriamente',
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
};

// ELIMINA UN CARRITO POR ID
export const deleteById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await deleteChartCtrl(id);

      res.json({
        msg: 'Carrito Eliminado Correctamente'
      })
    } catch (error) {
        res.status(500).json({
          error: error,
        });
    }
};

//AGREGADO DE PRODUCTOS A UN CARRITO
export const addToChart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { id_prod } = req.params;

        const productUpdated = await addToChartCtrl(id, id_prod);

        res.json({
            msg: 'Producto Agregado Correctamente',
            data: productUpdated
        })
    } catch (error) {
        res.status(500).json({
          error: error,
        });
    }
};

//BORRADO DE PRODUCTOS DE UN CARRITO
export const deleteFromChart = async (req: Request, res: Response) => {
    try {
        //OBTENGO LOS ID
        const { id } = req.params;
        const { id_prod } = req.params;

        const productUpdated = await deleteFromChartCtrl(id, id_prod);

        res.json({
            msg: 'Producto Eliminado Correctamente'
        })
    } catch (error) {
        res.status(500).json({
          error: error,
        });
    }
};

//COMPLETACION DE COMPRA

export const finCompra =async (req: Request, res: Response) => {
  try {
    
    const { id_chart } = req.params;

    finCompraCtrl(id_chart)

  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
}