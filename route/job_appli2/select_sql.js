var query = require('../sql');

async function select_sql(id,table_name){

    var sql = `SELECT * FROM job_app_db_29.${table_name} where appli_id = '${id}'`;

    var data =await query(sql);
    // console.log(data);
    return({result:data.result})
    
}

module.exports = select_sql;