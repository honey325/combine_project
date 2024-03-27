var mysql = require('mysql');



function show(req, res) {

    pathname = req.url.split("?")[0];




    var records = 10;
    var current = parseInt(req.query.page);
    if (isNaN(current)) {
        current = 1;
    }
    var order = req.query.order;
    if (order == undefined) {
        order = "asc"

    }
    var order_col = req.query.order_col
    if (order_col == undefined) {
        order_col = "std_id"
    }

    var start = (current - 1) * records;

    const con = mysql.createConnection({
        host: 'localhost',
        user: "root",
        password: 'root',
        database: "db_27_2"
    });
    var month = req.query.month;
    if (month == undefined) {
        month = 'feb';
    }

    var date;
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


    var data = {}
    var field_names = { 1: "ID", 2: "Name", 3: 'LastName', 4: "Present Day", 5: "Percentage" }
  
    con.connect(function (err) {
        if (err) throw err;


        var userid = req.query.std_id || 0 ;
    
        // if(isNaN(parseInt(req.query.std_id)) ){
  
        //     res.render('display3', { current: current, month_name: month, data: data, header: field_names, order_field: order_col, order: order, userid: userid, fname: fname, lname: lname, days: days, total ,error: "Please Enter Valid UserID"});
            
        // }
        var total 
        var condition = req.query.condition;
        var fname = req.query.fname || '';
        var lname = req.query.lname || '';
        // var percent = req.query.percent || 0;
        var days = req.query.days || 0;
        if (fname.indexOf('%') == -1) {
            fname = `%${fname}%`;
        }
        else {
            fname = `${fname}`;
        }
        if (lname.indexOf('%') == -1) {
            lname = `%${lname}%`;
        }
        else {
            lname = `${lname}`;
        }

      
        var sql = `select std_master.std_id,std_master.first_name,std_master.last_name,count(att.present) as days,(count(att.present)/${len}*100) as percent from std_master left join att on std_master.std_id = att.std_id  where present = '1' && (date_ between '${from_date}' and '${to_date}')${userid != 0 ? '&& std_master.std_id in ('+  userid +')': ''} && (first_name Like '${fname}' ${condition == 'and'? '&&' : '||'} last_name like '${lname}') group by std_id having ${days != 0 ? 'days =' + days : 'days > 0'}  order by ${order_col} ${order} limit ${start},${records}`;

        var sql2 = `select std_master.std_id,std_master.first_name,std_master.last_name,count(att.present) as days,(count(att.present)/${len}*100) as percent from std_master left join att on std_master.std_id = att.std_id  where present = '1' && (date_ between '${from_date}' and '${to_date}')${userid != 0 ? '&& std_master.std_id in (' + userid +')' : ''} && (first_name Like '${fname}' && last_name like '${lname}') group by std_id having ${days != 0 ? 'days =' + days : 'days > 0'}  order by ${order_col} ${order};`;
        if (req.query.total == undefined) {
            con.query(sql2, function (err, result2, field) {

                if (err) throw err;
                total = Math.ceil(result2.length / records);
               
            })
        }
        else{
            total = req.query.total
        }
        // var header = []
        con.query(sql, function (err, result, field) {
           
            if (err) throw err;
            data = result;
            query = req.query;

            res.render('./search_grid/display3', { current: current, month_name: month, data: data, header: field_names, order_field: order_col, order: order, userid: userid, fname: fname, lname: lname, days: days, total,condition ,error : ''});

        });
    })

    // }
    // catch (error) {
    
    //     res.render('home', { header: [], data: [], sql: '',order,order_col, len, pathname: pathname, current: current, total: total, query: req.query, error: error.message });
    // }

}

module.exports = show;