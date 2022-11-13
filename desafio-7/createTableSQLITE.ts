import db from "./DB/sqliteConnection";

const createTable = () => {
        db.schema.createTable('ecommerce', table => {
        table.increments('id').primary();
        table.string('date', 100).notNullable();
        table.string('emisor', 100).notNullable();
        table.string('mje', 200);
    })
}

createTable();