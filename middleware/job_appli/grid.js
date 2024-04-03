var query = require('../../controller/sql');

async function grid(req, res, next) {


  let sql = `select * from basic_detail`;
  let data = await query(sql);

  req.data = data.result;
  req.data_header = data.header
  next();

}
module.exports = grid