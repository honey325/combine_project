const generateUniqueId = require('generate-unique-id');
var query = require('../sql')
async function newpass(req, res) {

    sql2 = `select count(*) as count from users where uname = '${req.query.uname}';`;

    let count = await query(sql2);

    if (count.result[0].count != 0) {
        var activation_code = generateUniqueId({
            length: 12,
        });
        sql = `update users set activation_code ='${activation_code}',createAt = current_timestamp() where uname = '${req.query.uname}'`
        data = await query(sql)

        res.json(activation_code);
    }
    else{
        res.json({err : "no data found"});
    }

}
module.exports = newpass