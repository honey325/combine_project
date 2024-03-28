const { response } = require('express');
var query = require('../sql')
const generateUniqueId = require('generate-unique-id');

async function register(req, res) {
    

    var check_uname = `select count(*) as count from users where uname = "${req.body.uname}";`
    var uname_count = await query(check_uname);

    if(uname_count.result[0].count >0){
        res.json(error = "UserName Already Registered");
        return;
    }
    var check_email = `select count(*) as count from users where email = "${req.body.email}";`
    var email_count = await query(check_email);

    if(email_count.result[0].count >0){
        res.json(error = "Email Already Registered");
        return;
    }
    var pwd_salt = generateUniqueId({
        length: 4

    });
    var activation_code = generateUniqueId({
        length: 12
    });

    var arr = [
        req.body.uname,
        pwd_salt,
        activation_code,
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.contact
    ]
    var sql = `INSERT INTO users (user_id, uname, pwd, pwd_salt, activation_code, fname, lname, email,contact,createAt,status) VALUES (default,?,'',?,?,?,?,?,?, current_timestamp(),0);`
    var data = await query(sql, arr);


    var response = [req.body.uname, activation_code]
    res.json(response);
}
module.exports = register;