// IMPORTACIONES DE LOS MODULOS
import express, { Request, Response } from "express";
import mainRouter from "../routes/router";
import { graphqlHTTP } from "express-graphql";
import { graphqlSchema, graphqlRoot} from "./graphql";

// CARGA DE EXPRESS
const app = express ();

// CONFIGURACION PARA RECIBIR DATOS JSON O FORM
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ENRUTAMIENTO
app.use('/api', mainRouter);
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlRoot,
    graphiql: true
}))

export default app