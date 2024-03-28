var query = require('../../route/sql');

async function grid(req,res,next){

    var sql = `select * from job_app_db_29.basic_detail`;
    var data = await query(sql);

    req.data = data.result;
    req.data_header = data.header
    next();

}
module.exports = grid