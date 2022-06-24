const mysql = require('mysql');

//para permitir assíncrono e aguardar async/await
const { promisify } = require('util');

//nós pegamos o objeto de banco de dados
const db = require('./db.config.js');
const database = {
    host: db.HOST,
    user: db.USER,
    password: db.PASSWORD,
    database: db.DB
}

//handle tasks in sequence
const pool = mysql.createPool(database);

//when we connect to the db, we can get err or connection
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {
            console.error('A CONEXÃO DA BASE DE DADOS FOI FECHADA')
        }
        if (err.code == 'ER_CON_COUNT_ERROR') {
            console.error('A BASE DE DADOS TEM MUITAS CONEXÕES')
        }
        if (err.code == 'ECONNREFUSED') {
            console.error('A CONEXÃO DA BASE DE DADOS FOI RECUSADA')
        }
    }

    if (connection) connection.release();
    console.log('DB está conectado');
    return;

});

//toda vez que eu solicitar algo do banco de dados, usaremos async/await em vez de callback
pool.query = promisify(pool.query);

//export connection 
module.exports = pool; 