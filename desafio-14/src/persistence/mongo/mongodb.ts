import mongoose from "mongoose";
import { ProductsModel } from "./models/products.model";
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config();

const connectionPath:any = process.env.MONGO_URL

export const initMongoDB = async () => {
    try {
      await mongoose.connect(connectionPath);
      console.log('Conexion a DB Exitosa!');
    } 
    catch (error) {
      console.log(`Ha ocurrido el siguiente error: ${error}`);
    }
};

export const getAll = async() => {
    try {
        const docs = await ProductsModel.find();
        return docs;
    } catch (error) {
        console.log(error);
    }
}

export const save = async(data:any) => {
    try {
        const prods = await ProductsModel.create(data);
        return prods;
    } catch (error) {
        console.log(error);
    }
};

export const getById = async (id:any) => {
    try {

      const product = await ProductsModel.findById(id);
      
      if (!product) throw new Error ('Producto Inexistente');
        
      return product

    } catch (error) {
        console.log(error);
    }
};

export const updateById = async (id:any, data:any) => {
    try {

        const product = await ProductsModel.findById(id);

        const timestamp = moment().format("DD/MM/YYYY, HH:mm");

        const { title, description, code, thumbnail, price, stock } = data
        
        if (!product) throw new Error ('Producto Inexistente');
        
        if(!title || !description || !code || !thumbnail || !price || !stock ) throw new Error ("Los campos estan incompletos")

        const productUpdated = await ProductsModel.findByIdAndUpdate(
            id,
            { timestamp, title, description, code, thumbnail, price, stock },
            { new: true }
          );
        
        return productUpdated;
  
      } catch (error) {
          console.log(error);
      }
}

export const deleteById = async (id:any) => {
    try {

      await ProductsModel.findByIdAndDelete(id);
      
    } catch (error) {
        console.log(error);
    }
};