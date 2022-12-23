// IMPORTACION DE MODULOS
import dotenv from 'dotenv';
import minimist from 'minimist';

// CONFIGURACION DE DOTENV
dotenv.config();

// CONFIGURACION DE MINIMIST
const optionalArgsObject = {
    alias: {
      p: 'port'
    },
    default: {
      p: 8080
    },
  };
  
const args = minimist(process.argv.slice(2), optionalArgsObject);
  

export default {
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS || 'mongodb://localhost/ecommerce',
    PUERTO: args.port,
    ARGUMENTOS: args
}