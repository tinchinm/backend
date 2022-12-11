// IMPORTACIONES DE LOS MODULOS
import MongoStore from 'connect-mongo';

export const StoreOptions = {
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_ATLAS,
      ttl: 180000, //si no se indica, dura 14 dias x defecto
      autoRemove: 'native',
      crypto: {
        secret: '1234',     
      },
    }),
    secret: 'secret', 
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 180000, //expresado en milisegundos
    },
  };