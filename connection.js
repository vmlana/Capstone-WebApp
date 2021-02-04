require("dotenv").config();

const mySql         = require('mysql');
const promise_mysql = require('promise-mysql');


const ConnectionString = {
    connectionLimit:10,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    multipleStatements: true
}


// *******************************************************
// ******** Database Connection Setup ********************
// *******************************************************
const savyDb = mySql.createConnection(ConnectionString);
const savyPoolDb = promise_mysql.createPool(ConnectionString);

module.exports = {savyDb, savyPoolDb};
