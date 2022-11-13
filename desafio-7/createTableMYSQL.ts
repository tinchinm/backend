import { options } from '../options/mysql'
import knex  from 'knex';

const knexLib = knex(options)

knexLib.schema
  .createTable('productos', (table) => {
    table.increments('id_table');
    table.string('id');
    table.string('timestamp');
    table.string('title');
    table.string('description');
    table.string('code');
    table.string('thumbnail');
    table.integer('price');
    table.integer('stock');
  })
  .then(() => console.log('Tabla creada Exitosamente'))
  .catch((err) => {
    console.log('No se pudo crear la tabla');
    console.log(err);
  })
  .finally(() => {
    knexLib.destroy();
  });