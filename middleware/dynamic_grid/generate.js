const pagination = require('../../route/dynamic_grid/pagination');
var query = require('../../route/sql');


async function generate(req, res) {

    var pathname = req.url.split("?")[0]
    var sql = req.query.sql;
    var len =req.query.len;
    
    if (sql == '' || sql == undefined) {
        sql = ""
        data = ""
        res.render('dynamic_grid/home', { header: [], data: [], len, sql: sql, pathname: pathname, total: 1, query: req.query, current: 1, error: '' });
    }


    else {

        try {
            if(len==undefined||len==''){
             data = await query(sql);
            len = data.result.length;
            }

            var current = parseInt(req.query.page);
            var records = 10;
            var total;
            if (isNaN(current)) {
                current = 1;
            }

            total = Math.ceil(len / records);
        
            page = await pagination(req, current, records, total);
           
            res.render('dynamic_grid/home', { header: page.header, data: page.result, pathname: pathname, len, sql: sql, query: req.query, url: req.url, total: total, current: current, error: '' });

        }
        catch (error) {
         
            res.render('dynamic_grid/home', { header: [], data: [], sql: '', len, pathname: pathname, current: current, total: total, query: req.query, error: error.message });
        }

    }
}
module.exports = generate;


