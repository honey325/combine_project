var query = require('../route/sql');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

async function login(req, res,next) {


    var uname = req.body.uname;
    var pwd = req.body.pwd;

    sql = `select * from users where uname = ?`;

    data = await query(sql,uname);

    if (data.result[0] == undefined || data.result[0].status != 1) {
        res.render('login', { error: 'Username Or Password is Incorrect' });
    }
    else {
        pwd_salt = md5(pwd + data.result[0].pwd_salt);

        if (pwd_salt == data.result[0].pwd) {
            const token = jwt.sign({email : data.result[0].email} , process.env.JWT_SECRET_KEY,{
                expiresIn : '5m'
            });
            
            res.cookie('token',token);
            next();
        }
        else {
            res.render('login', { error: 'Username Or Password is Incorrect' });
        }
    }


}
module.exports = login;