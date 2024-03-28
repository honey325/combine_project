
var con = require('../connect')

function search(req, res) {


    var first_name = [];
    var last_name = [];
    var email = [];
    var city = [];
    var country = [];
    var phone = [];
    var input = ''


    if (req.query.input == undefined) {
        // res.render('home', { data: '', header: '', error: '' });
        // return;
    }
    else {
        input = req.query.input;

        indexs = []
        var chars = ['_', '^', '$', '{', '}', ':']
        for (i = 0; i < input.length; i++) {
            if (chars.indexOf(input[i]) != -1) {

                indexs.push(i);
            }
            else {

            }
        }

        const map = new Map([
            ["_", 'first_name'],
            ["^", 'last_name'],
            ["$", 'email'],
            ["}", "country"],
            ["{", "phone"],
            [":", "city"]
        ]);


        values = []
        for (i = 0; i < indexs.length; i++) {


            if (map.get(input[indexs[i]]) == 'first_name') {

                first_name.push(input.slice(indexs[i] + 1, indexs[i + 1]));

            }

            else if (map.get(input[indexs[i]]) == 'last_name') {

                last_name.push(input.slice(indexs[i] + 1, indexs[i + 1]));

            }
            else if (map.get(input[indexs[i]]) == 'email') {
                email.push(input.slice(indexs[i] + 1, indexs[i + 1]));

            }
            else if (map.get(input[indexs[i]]) == 'phone') {
                phone.push(input.slice(indexs[i] + 1, indexs[i + 1]));

            }
            else if (map.get(input[indexs[i]]) == 'city') {
                city.push(input.slice(indexs[i] + 1, indexs[i + 1]));

            }
            else if (map.get(input[indexs[i]]) == 'country') {
                country.push(input.slice(indexs[i] + 1, indexs[i + 1]));

            }
        }
    }
    first_name_str = '';
    lirst_name_str = '';
    email_str = '';
    phone_str = '';
    country_str = '';
    city_str = '';


    if (first_name.length == 0) {
        first_name_str = "'%%'"
    }
    for (i = 0; i < first_name.length; i++) {

        if (i == 0) {
            first_name_str += `'%${first_name[i]}%'`
        }
        else {
            first_name_str += `|| first_name like '%${first_name[i]}%'`;
        }
    }
    if (last_name.length == 0) {
        last_name_str = "'%%'"
    }
    for (i = 0; i < last_name.length; i++) {

        if (i == 0) {
            last_name_str += `'%${last_name[i]}%'`
        }
        else {
            last_name_str += `|| last_name like '%${last_name[i]}%'`;
        }
    }
    if (city.length == 0) {
        city_str = "'%%'"
    }
    for (i = 0; i < city.length; i++) {

        if (i == 0) {
            city_str += `'%${city[i]}%'`
        }
        else {
            city_str += `|| city like '%${city[i]}%'`;
        }
    }
    if (email.length == 0) {
        email_str = "'%%'"
    }
    for (i = 0; i < email.length; i++) {

        if (i == 0) {
            email_str += `'%${email[i]}%'`
        }
        else {
            email_str += `|| email like '%${email[i]}%'`;
        }
    }
    if (phone.length == 0) {
        phone_str = "'%%'"
    }
    for (i = 0; i < phone.length; i++) {

        if (i == 0) {
            phone_str += `'%${phone[i]}%'`
        }
        else {
            phone_str += `|| phone like '%${phone[i]}%'`;
        }
    }

    for (i = 0; i < chars; i++) {

    }

    if (country.length == 0) {
        country_str = "'%%'"
    }
    for (i = 0; i < country.length; i++) {

        if (i == 0) {
            country_str += `'%${country[i]}%'`
        }
        else {
            country_str += `|| country like '%${country[i]}%'`;
        }
    }



    var header = [];
    try {
        // fname.length = undefined ? fname = 0 :;

        var sql = `select * from std_master where (first_name like ${first_name_str}) && (last_name like ${last_name_str}) && (city like ${city_str}) && (email like ${email_str}) && (phone1 like ${phone_str}) && (country like ${country_str})`;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;

            data = result;
            for (let i = 0; i < fields.length; i++) {
                header.push(fields[i].name);
            }

            if (data.length == 0) {
                res.render('delimeter/home', { data, header, query: input, error: 'No Data Found' });
            }
            else {
                res.render('delimeter/home', { data, header, query: input, error: '' });

            }



        })


    }
    catch (e) {
        res.render('delimeter/home', { data, header, query: input, error: e });

    }





    // res.render('home', { error: '' });

}

module.exports = search