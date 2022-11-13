import knex from "knex";

const options = {
    client:'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'mydb'
    }
}

const db = knex(options)

export default db;