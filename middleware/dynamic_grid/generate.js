const pagination = require('../../controller/dynamic_grid/pagination');
var query = require('../../controller/sql');



async function generate(req, res) {

  var pathname = req.url.split("?")[0]
  var sql = req.query.sql;
  var len = req.query.len;
 

  if (sql == '' || sql == undefined) {
    sql = ""
    data = ""
    res.render('dynamic_grid/home', { header: [], data: [], len, sql: sql, pathname: pathname, total: 1, query: req.query, current: 1, error: '' });
  }


  else {

    try {
      sql = sql.trim();
      sql = sql.toLowerCase();
      if ((sql.indexOf('update') == -1) && (sql.indexOf('drop') == -1) && (sql.indexOf('truncate') == -1) && (sql.indexOf('delete') == -1) && (sql.indexOf('alter') == -1) && (sql.indexOf('insert') == -1)) {
        // var total = req.query.total
        if (len == undefined || len == '') {
          data = await query(sql);
          len = data.result.length;
          // total = Math.ceil(len / records);

        }

        var current = parseInt(req.query.page);
        var records = 10;



        if (isNaN(current)) {
          current = 1;
        }
        
        total = Math.ceil(len / records);
        
        page = await pagination(req, current, records, total);

        res.render('dynamic_grid/home', { header: page.header, data: page.result, pathname: pathname, len, sql: sql, query: req.query, url: req.url, total: total, current: current, error: '' });
      }
      else {

        res.render('dynamic_grid/home', { header: [], data: [], sql: '', len, pathname: pathname, current: 1, total: 1, query: req.query, error: "Invalid query" });
      }

    }
    catch (error) {

      res.render('dynamic_grid/home', { header: [], data: [], sql: '', len, pathname: pathname, current: 1, total: 1, query: req.query, error: "Invalid query" });
    }

  }
}
module.exports = generate;


