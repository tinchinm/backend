// IMPORTACIONES DE LOS MODULOS
import mongoose from "mongoose";

// NOMBRE DE LA COLECCION EN UNA VARIABLE
export const chartCollectionName = 'carrito'

// DEFINICION DEL ESQUEMA PARA LA DB
const chartSchema = new mongoose.Schema({
    timestamp:{type: String, required: true},
    products:{ type: Array, required: true}
})

//EXPORTACION DEL ESQUEMA PARA USO
export const ChartModel = mongoose.model(chartCollectionName, chartSchema)