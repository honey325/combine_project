var query = require('../sql');

async function select_sql(id,table_name){

    var sql = `SELECT * FROM ${table_name} where appli_id = '${id}'`;

    var data =await query(sql);
    
    return({result:data.result})
    
}

module.exports = select_sql;