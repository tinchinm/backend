import mongoose from "mongoose";
import { ProductsModel } from "./models/productos.model";
import { ChartModel } from "./models/carrito.model";
import { UsersModel } from "./models/users.model";
import { sendMailList } from '../../../controllers/mail.controller';
import { sendWpp } from '../../../controllers//wpp.controller';
import { log } from "../../../config/logs.config";
import dotenv from 'dotenv';

dotenv.config();

const connectionPath:any = process.env.MONGO_ATLAS

mongoose.set('strictQuery', false);

class MongoDB {

    static instance:any;

    initDB:unknown

    constructor(){
        
        if (!MongoDB.instance){
            this.initDB = mongoose.connect(connectionPath);
            MongoDB.instance = this;
            log.info('Conexion a DB Exitosa!');
        }else{
            return MongoDB.instance;
        }
    }

    async initMongoDB(){
        return await this.initDB
    }
        
}

export const mongo = new MongoDB

export const getAll = async() => {
    try {
        const prods = await ProductsModel.find();
        return prods;
    } catch (error) {
        log.error(error);
    }
}

export const save = async(data:any) => {
    try {
        const prods = await ProductsModel.create(data);
        return prods;
    } catch (error) {
        log.error(error);
    }
};

export const getById = async (id:String) => {
    try {

      const product = await ProductsModel.findById(id);
      
      if (!product) throw new Error ('Producto Inexistente');
        
      return product

    } catch (error) {
        log.error(error);
    }
};

export const updateById = async (id:String, data:any) => {
    try {

        const product = await ProductsModel.findById(id);

        const { timestamp, title, description, code, thumbnail, price, stock } = data
        
        if (!product) throw new Error ('Producto Inexistente');
        
        if(!title || !description || !code || !price || !stock ) throw new Error ("Los campos estan incompletos")

        const productUpdated = await ProductsModel.findByIdAndUpdate(
            id,
            { timestamp, title, description, code, thumbnail, price, stock },
            { new: true }
          );
        
        return productUpdated;
  
      } catch (error) {
          log.error(error);
      }
}

export const deleteById = async (id:String) => {
    try {

      await ProductsModel.findByIdAndDelete(id);
      
    } catch (error) {
        log.error(error);
    }
};

/////////////////////////////////CARRITOS///////////////////////////////////////////////////////////

export const getChart = async (id:String) => {
    try {
      
      const chart = await ChartModel.findById(id);
  
      if (!chart) throw new Error("No existe el carrito seleccionado");

      return chart.products

    } catch (error) {
        log.error(error);
    }
  };

export const createChart = async (userID:String,timestamp:String,products:[]) => {
    try {
      const newProduct = await ChartModel.create({
        timestamp,
        products,
        userID
      });
  
     return newProduct

    } catch (error) {
        log.error(error);
    }
};

// ELIMINA UN CARRITO POR ID
export const deleteChart = async (id:String) => {
    try {

      await ChartModel.findByIdAndDelete(id);

    } catch (error) {
        log.error(error);
    }
};

//AGREGADO DE PRODUCTOS A UN CARRITO
export const addToChart = async (id:String, id_prod:String) => {
    try {
        //LLAMO AL CARRITO POR ID
        const chartID = await ChartModel.findById(id);
        
        //VALIDO QUE SE HAYA TRAIDO UN CARRITO
        if (!chartID) throw new Error('El carrito seleccionado no existe');
        
        //LLAMO UN PRODUCTO POR ID
        const product = await ProductsModel.findById(id_prod);

        //VALIDO QUE SE HAYA TRAIDO UN PRODUCTO
        if (!product) throw new Error('El producto seleccionado no existe');

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

        return productUpdated;

    } catch (error) {
        log.error(error);
    }
};

//BORRADO DE PRODUCTOS DE UN CARRITO
export const deleteFromChart = async (id:String, id_prod:String) => {
    try {

        //LLAMO AL CARRITO POR ID
        const chartID = await ChartModel.findById(id);

        //VALIDO QUE SE HAYA TRAIDO UN CARRITO
        if (!chartID) throw new Error('El carrito seleccionado no existe');
        
        //CREO UN ARRAY CON EL ARRAY TRAIDO DEL CARRITO
        const products = chartID.products

        //BUSCO EL PRODUCTO DENTRO DEL CARRITO Y SU INDICE
        const prod = products.find((producto:any) => producto._id == id_prod);
        const indice = products.findIndex((producto: any) => producto.id == id_prod);

        //VALIDO QUE SE HAYA ENCONTRADO UN PRODUCTO
        if (!prod) throw new Error('El producto seleccionado no existe');

        //BORRO EL PRODUCTO
        products.splice(indice, 1);

        //REALIZO EL UPDATE
        const productUpdated = await ChartModel.findByIdAndUpdate(
            id,
            { products },
            { new: true }
        );
        
        return productUpdated

    } catch (error) {
        log.error(error);
    }
};

//COMPLETACION DE COMPRA
export const finCompra = async (id_chart:String) => {
  try {

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
    log.error(error);
}
}

/////////////////////////////////////USUARIOS////////////////////////////////////////////////////

// REGISTRAR USUARIO
export const register = async (data:any) => {

    const {name, address, phone, mail, username, password, avatar} = data

    try {
      
        const newUser = new UsersModel({name, address, phone, mail, username, password, avatar});

        await newUser.save()
      
        return newUser
  
    } catch (error) {
        log.error(error);
    }
  }

  export const getAllUsers = async() => {
    try {
        const users = await UsersModel.find();
        return users;
    } catch (error) {
        log.error(error);
    }
}