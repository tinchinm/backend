// IMPORTACIONES DE LOS MODULOS
import { Request, Response } from 'express';
import { ChartModel } from '../models/carrito.model';
import { UsersModel } from '../models/users.model';
import { ProductsModel } from '../models/productos.model';
import { sendMailList } from './mail.controller';
import { sendWpp } from './wpp.controller';
import moment from 'moment';
import { finished } from 'stream';

// TRAE EL CARRITO INDICADO POR ID
export const getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const chart = await ChartModel.findById(id);
  
      if (!chart)
        return res.status(404).json({
          msg: "No existe el carrito seleccionado",
        });
  
      res.json({
        data: chart.products,
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
  
      const newProduct = await ChartModel.create({
        timestamp,
        products,
        userID
      });
  
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

      await ChartModel.findByIdAndDelete(id);

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
        //OBTENGO LOS ID
        const { id } = req.params;
        const { id_prod } = req.params;

        //LLAMO AL CARRITO POR ID
        const chartID = await ChartModel.findById(id);
        
        //VALIDO QUE SE HAYA TRAIDO UN CARRITO
        if (!chartID){
            return res.status(400).json({
                msg:'El carrito seleccionado no existe'
            })
        }
        //LLAMO UN PRODUCTO POR ID
        const product = await ProductsModel.findById(id_prod);

        //VALIDO QUE SE HAYA TRAIDO UN PRODUCTO
        if (!product){
            return res.status(400).json({
                msg:'El producto seleccionado no existe'
            })
        }

        //CREO UN ARRAY CON EL ARRAY TRAIDO DEL CARRITO
        const products = chartID.products

        //PUSHEO PRODUCTO NUEVO EN EL ARRAY CREADO
	      products.push(product)

        //REALIZO EL UPDATE
        const productUpdated = await ChartModel.findByIdAndUpdate(
            id,
            { products },
            { new: true }
          );

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

        //LLAMO AL CARRITO POR ID
        const chartID = await ChartModel.findById(id);

        //VALIDO QUE SE HAYA TRAIDO UN CARRITO
        if (!chartID){
            return res.status(400).json({
                msg:'El carrito seleccionado no existe'
            })
        }
        
        //CREO UN ARRAY CON EL ARRAY TRAIDO DEL CARRITO
        const products = chartID.products

        //BUSCO EL PRODUCTO DENTRO DEL CARRITO Y SU INDICE
        const prod = products.find((producto:any) => producto._id == id_prod);
        const indice = products.findIndex((producto: any) => producto.id == id_prod);

        //VALIDO QUE SE HAYA ENCONTRADO UN PRODUCTO
        if (!prod){
            return res.status(400).json({
                msg:'El producto seleccionado no existe'
            })
        }

        //BORRO EL PRODUCTO
        products.splice(indice, 1);

        //REALIZO EL UPDATE
        const productUpdated = await ChartModel.findByIdAndUpdate(
            id,
            { products },
            { new: true }
          );

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
    
    //OBTENGO EL ID DEL CARRITO
    const { id_chart } = req.params;

    //LLAMO AL CARRITO POR ID
    const chart = await ChartModel.findById(id_chart);

    //LLAMO AL USUARIO POR ID
    const user = await UsersModel.findById(chart?.userID);

    //CAMBIO EL STATUS DEL CARRITO
    const status = 'finished';
    await ChartModel.findByIdAndUpdate( id_chart,
      { status },
      { new: true }
    );

    //ENVIO MAIL Y WPP DE CONFIRMACION
    await sendMailList(user?.mail, user?.name, chart?.products);
    await sendWpp(user?.phone);

  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
}