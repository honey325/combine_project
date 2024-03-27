var con = require('./connect');

function query(sql, input) {
    var header = [];

    return new Promise((resolve, reject) => {


        con.query(sql, input, function (err, result, field) {
            if (err) return reject(err);

            if (field == undefined) {
                header = [];

            } else {
                
                for (let i = 0; i < field.length; i++) {
                    header.push(field[i].name);
                }
            }
           
            return resolve({ result, header });
        })
    })

}

module.exports = query;