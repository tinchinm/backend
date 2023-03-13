import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProdDocument = Prod & Document

@Schema()
export class Prod {
    @Prop({type: String, required: true})
    name: String

    @Prop({type: String, required: true})
    description: String

    @Prop({type: Number, required: true})
    price: Number

    @Prop({type: Number, required: true})
    stock: Number
}

export const ProdCollectionName = Prod.name

export const ProdSchema =  SchemaFactory.createForClass(Prod)