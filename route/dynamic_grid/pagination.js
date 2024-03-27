var query = require('../sql');


function pagination(req, current, records, total) {

    return new Promise(async (resolve, reject) => {
        try {

            var start = (current - 1) * records;
            sql = req.query.sql
            // sql = sql + ` limit ${start},${records}`;

            sql = sql.split(';')[0]
            if (sql.indexOf('limit') != -1) {
                sql = sql.split('limit')[0] + ` limit ${start},${records}`
            }
            else {
                sql = sql + ` limit ${start},${records}`
            }

            data = await query(sql);
            return resolve({ result: data.result, header: data.header });
        }
        catch (err) {
            return reject(err);
        }
    })


}

module.exports = pagination;