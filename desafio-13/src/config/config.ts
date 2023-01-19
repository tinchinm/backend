// IMPORTACION DE MODULOS
import minimist from 'minimist';

// CONFIGURACION DE MINIMIST
const optionalArgsObject = {
    alias: {
      p: 'port',
      m: 'mode'
    },
    default: {
      p: 8080,
      m: "FORK"
    },
  };
  
const args = minimist(process.argv.slice(2), optionalArgsObject);

export default {
    PUERTO: args.port,
    MODO: args.mode,
}