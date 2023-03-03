import { buildSchema } from 'graphql'
import { getAllController as getAll, 
         getByIdController as getById, 
         saveController as save, 
         updateByIdController as updateById, 
         deleteByIdController as deleteById } from '../controllers/productos.controller.gql'

export const graphqlSchema = buildSchema(`
    type Product{
        id:String!
        title:String
        description:String
        price:String
        stock:String
    }
    input ProductInput{
        title:String!
        description:String!
        price:String!
        stock:String!
    }
    type Query{
        getAll:[Product]
        getById(id:String!):Product
    }
    type Mutation{
        save(data:ProductInput):Product
        updateById(id:String, data:ProductInput):Product
        deleteById(id:String):Product
    }
`)

export const graphqlRoot = { getAll, getById, save, updateById, deleteById }