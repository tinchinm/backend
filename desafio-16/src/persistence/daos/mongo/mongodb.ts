import mongoose from "mongoose";
import { ProductsModel } from "./models/products.model";
import dotenv from 'dotenv';

dotenv.config();

const connectionPath:any = process.env.MONGO_URL

mongoose.set('strictQuery', false);

class MongoDB {

    static instance:any;

    initDB:unknown

    constructor(){
        
        if (!MongoDB.instance){
            this.initDB = mongoose.connect(connectionPath);
            MongoDB.instance = this;
            console.log('Conexion a DB Exitosa!');
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

        const { title, description, code, thumbnail, price, stock } = data
        
        if (!product) throw new Error ('Producto Inexistente');
        
        if(!title || !description || !price || !stock ) throw new Error ("Los campos estan incompletos")

        const productUpdated = await ProductsModel.findByIdAndUpdate(
            id,
            { title, description, code, thumbnail, price, stock },
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