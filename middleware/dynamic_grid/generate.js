const pagination = require('../../controller/dynamic_grid/pagination');
var query = require('../../controller/sql');


async function generate(req, res) {

  let pathname = req.url.split("?")[0]
  let sql = req.query.sql;
  let len = req.query.len;

  if (sql == '' || sql == undefined) {
    res.render('dynamic_grid/home', { header: [], data: [], len, sql: '', pathname: pathname, total: 1, query: req.query, current: 1, error: '' });
  }



  else {

    try {
      sql = sql.toLowerCase();
      if ((sql.indexOf('update') == -1) && (sql.indexOf('drop') == -1) && (sql.indexOf('truncate') == -1) && (sql.indexOf('delete') == -1) && (sql.indexOf('alter') == -1) && (sql.indexOf('insert') == -1)) {
        if (len == undefined || len == '') {
          data = await query(sql);
          len = data.result.length;
        }

        let current = parseInt(req.query.page);
        let records = 10;
        let total;
        if (isNaN(current)) {
          current = 1;
        }

        total = Math.ceil(len / records);
        page = await pagination(req, current, records, total);
        res.render('dynamic_grid/home', { header: page.header, data: page.result, pathname: pathname, len, sql: sql, query: req.query, url: req.url, total: total, current: current, error: '' });
      }
      else {
        res.render('dynamic_grid/home', { header: [], data: [], sql: '', len, pathname: pathname, current: current, total: total, query: req.query, error: "invalid query" });
      }
    }
    catch (error) {

      res.render('dynamic_grid/home', { header: [], data: [], sql: '', len, pathname: pathname, current: current, total: total, query: req.query, error: "invalid query" });
    }

  }
}
module.exports = generate;


