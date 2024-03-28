var con = require('../connect');
function marks(req, res) {


    id = req.query.id;

    var data1 = {};
    var data2 = {};
    var data3 = {};


        var sql1 = `select sub_master.sub_name,result.prac_marks,result.theory_marks,result.total_p, theory_marks,result.total_th, result.exam_id from result join sub_master on result.sub_id = sub_master.sub_id where result.std_id = ${id} && result.exam_id = 1 ;`

        var sql2 = `select sub_master.sub_name,result.prac_marks,result.theory_marks,theory_marks,result.total_p, theory_marks,result.total_th , result.exam_id from result join sub_master on result.sub_id = sub_master.sub_id where result.std_id = ${id} && result.exam_id = 2 ;`


        var sql3 = `select sub_master.sub_name,result.prac_marks,result.theory_marks ,theory_marks,result.total_p, theory_marks,result.total_th, result.exam_id from result join sub_master on result.sub_id = sub_master.sub_id where result.std_id = ${id} && result.exam_id = 3 ;`

        var sql5 = `select count(*) as present ,(select count(*) from att where std_id = ${id}) as days from att where present = 'present' && std_id = ${id};`;

        var sql4 = `select first_name from std_master where std_id = ${id}`

        con.query(sql5, function (err, result5, fields) {
            if (err) throw err;
            att = result5;
          
        });

        con.query(sql4, function (err, result4, fields) {
            if (err) throw err;
            std_name = result4;
        });

        con.query(sql1, function (err, result1, fields) {
            if (err) throw err;
            data1 = result1;
           
            // res.render('mark', { data1:data1 , id :id});
        });
        
        con.query(sql2, function (err, result2, fields) {
            if (err) throw err;
            data2 = result2;
            // res.render('mark', { data1:data1 , id :id});
        });
        con.query(sql3, function (err, result3, fields) {
            if (err) throw err;
            data3 = result3;
            res.render('./result/mark', { data1: data1, data2: data2, data3: data3, sta_name: std_name, id: id, att: att });
        });
    
}
module.exports = marks;