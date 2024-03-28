var mysql = require('mysql');


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    // database: `users_info`,
    dateStrings :true
})
// return con;



module.exports = con;