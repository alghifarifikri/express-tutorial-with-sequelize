const { Client } = require("pg");

const client = new Client({
    user: process.env.DB_USER, // admin
    host: process.env.DB_SERVER, // localhost
    database: process.env.DB_DATABASE, // db_pegawai
    password: process.env.DB_PASSWORD, // 1234
    port: Number(process.env.DB_PORT)
});

client.connect()

module.exports = client;