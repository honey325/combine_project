var con = require('../../connect')

function result(req, res) {
  var total2 = 20;
  var records = 10;
  var current = parseInt(req.query.page);
  if (isNaN(current)) {
    current = 1;
  }
  var order = req.query.order;
  if (order == undefined) {
    order = "asc"
  }

  if (order_col == undefined) {
    order_col = "std_id"
  }

  var order_col = req.query.order_col;
  if (order_col == undefined) {
    order_col = "std_id"
  }

  var start = (current - 1) * records;
  var month = req.query.month;
  if (month == undefined) {
    month = 'feb';
  }

  if (month == 'dec') {
    from_date = "2023-12-01"
    to_date = '2023-12-31'
    len = 31
  }
  else if (month == 'jan') {
    from_date = "2024-01-01"
    to_date = '2024-01-31'
    len = 31
  }
  else {
    from_date = '2024-02-01'
    to_date = '2024-02-29'
    len = 29
  }


  var data1 = {};
  var data2 = {};
  var data3 = {};

  //id,name,prac-1,theory-1
  var sql1 = `select std_master.std_id, std_master.first_name, sum(result.prac_marks) as prac1,sum(result.total_p) as prac1_total,sum(result.total_th) as th1_total,sum(result.theory_marks) as th1 from std_master join result on std_master.std_id = result.std_id  where exam_id =1 group by std_id limit ${start},${records}`;

  //id,prac-2,thoery-2
  var sql2 = `select std_master.std_id, sum(result.prac_marks) as prac2,sum(result.theory_marks) as th2,sum(result.total_p) as prac2_total,sum(result.total_th) as th2_total from std_master join result on std_master.std_id = result.std_id  where exam_id =2 group by std_id limit ${start},${records};`

  //id,prac-3,theory-3
  var sql3 = `select std_master.std_id, sum(result.prac_marks) as prac3,sum(result.theory_marks) as th3 ,sum(result.total_p) as prac3_total,sum(result.total_th) as th3_total from std_master join result on std_master.std_id = result.std_id  where exam_id =3 group by std_id limit ${start},${records};`

  con.query(sql1, function (err, result1, fields) {
    if (err) throw err;
    data1 = result1;
  });
  con.query(sql2, function (err, result2, fields) {
    if (err) throw err;
    data2 = result2;
  });


  con.query(sql3, function (err, result3, fields) {
    if (err) throw err;
    data3 = result3;
    res.render('./result/result', { total2, data1: data1, data2: data2, data3: data3, current2: current });
  });
  //




}

module.exports = result;