// IMPORTACIONES DE LOS MODULOS
import MongoStore from 'connect-mongo';
import config from './config'

export const StoreOptions = {
    store: MongoStore.create({
      mongoUrl: config.MONGO_ATLAS_URL,
      ttl: 180000, //si no se indica, dura 14 dias x defecto
      autoRemove: 'native',
      crypto: {
        secret: 'palabra-secreta',     
      },
    }),
    secret: 'secret', 
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 180000, //expresado en milisegundos
    },
  };