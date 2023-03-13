import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { ProdCollectionName, ProdDocument } from './dto/products.schema';
import { CreateProduct } from './dto/save-products.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(ProdCollectionName) private ProdModel:Model<ProdDocument>){}

    async getProducts(){
        const result = await this.ProdModel.find()
        return result
    }

    async getById(id:String){
         const result = await this.ProdModel.findById(id)
         return result
    }

    async saveProduct(product:CreateProduct){
        const result = await this.ProdModel.create(product)
        return result
    }
    async updateProduct(id:String, product:CreateProduct){
        const result = await this.ProdModel.findByIdAndUpdate(id, product, {new: true})
        return result
    }
    async deleteProduct(id:String){
        const result = await this.ProdModel.findByIdAndDelete(id)
        return result
    }

}