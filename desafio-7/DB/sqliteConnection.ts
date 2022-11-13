import knex from "knex"

const options = {
    client: 'sqlite3',
    connection:{
        filename: './DB/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

const db = knex(options);

export default db;