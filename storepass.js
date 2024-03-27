var query = require('./sql');
var md5 = require('md5');



async function storepass(req, res) {
    var pwd = req.body.pwd;
    var pwd2 = req.body.pwd2;
    var uname = req.body.uname;
    var pwd_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (req.url == "/updatepass") {
        var code = req.body.code;
        sql = `select * from users where uname = '${uname}'`
        data = await query(sql);
        if (data.result[0].activation_code != code) {
            res.json('0');
        }
    }

    if (!pwd_regex.test(pwd)) {
        res.json("Please Enter Valid Password");
        return;
    }

    if (pwd != pwd2) {
        res.json("Passwords does not matched");
        return;
    }
    else {


        select_sql = `select pwd_salt from users where uname = '${uname}'`;
        var salt = await query(select_sql);

        pwd_salt = md5(pwd + salt.result[0].pwd_salt);


        sql = `update users set pwd = '${pwd_salt}',status = '1' where uname = '${uname}'`;
        var data = await query(sql);
        if (data.result.affectedRows == 0) {
            res.json("0");
            return;
        }

        else if (data.result.affectedRows == 1) {
            res.json("1");
            return;
        }

    }
}

module.exports = storepass;
