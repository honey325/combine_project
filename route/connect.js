var mysql = require('mysql');


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: `final_task`,
    dateStrings :true
})
// return con;



module.exports = con;