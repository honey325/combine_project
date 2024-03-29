var mysql = require('mysql');
require('dotenv').config();


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: process.env.database,
    dateStrings :true
})
// console.log(process.env.database);
// return con;



module.exports = con;