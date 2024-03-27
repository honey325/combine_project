// const { render } = require("ejs");


function server_val(req, res, next) {
    var error = '';
    req.body['work_id'] = [];
    req.body['ref_id'] = [];

    console.log(1);
    console.log(req.body);

    function hasNumber(str) {
        return /\d/.test(str); // check if it has number
    }
    function isNumber(str) {
        return isNaN(parseInt(str))
    }
    function isContact(str) {
        return (isNaN(parseInt(str)) || str.length != 10 || str.indexOf('.') != -1)
    }
    function isDate(str) {
        return isNaN(new Date(str))
    }

    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    function isemail(str) {
        return !emailRegex.test(str);
    }
    function year(str) {
        return !(!isNaN(parseInt(str)) || str > 2024 || str < 1960)
    }
    function isPercent(str) {
        return !(!isNaN(parseInt(str)) || str > 100 || str < 0)
    }





    // basic_detail

    if (req.body.firstname == '' || req.body.lastname == '' || req.body.designation == '' || req.body.email == '' || req.body.contact == '' || req.body.state == '' || req.body.city == '' || req.body.gender == '' || req.body.addr_1 == '' || req.body.addr_2 == '' || req.body.rela_status == '' || req.body.zipcode == '' || req.body.dob == '') {

        error = "Please fill all require Detail in Basic Details"
        res.render('job_appli/form', { data: req.body, error, inserted_id: '' });

        return;
    }

    if (hasNumber(req.body.firstname) || hasNumber(req.body.lastname) || hasNumber(req.body.designation) || isemail(req.body.email) || isContact(req.body.contact) || hasNumber(req.body.state) || hasNumber(req.body.city) || hasNumber(req.body.gender) || hasNumber(req.body.rela_status) || isNumber(req.body.zipcode) || isDate(req.body.dob)) {

        error = "please fill correct details for fields in basic details";
        res.render('job_appli/form', { data: req.body, error, inserted_id: '' });

        return;
    }

    // education

    if (req.body.ssc_board == '' || req.body.ssc_passing == '' || req.body.ssc_percent == '' || req.body.hsc_board == '' || req.body.hsc_passing == '' || req.body.hsc_percent == '' || req.body.bach_uni == '' || req.body.bach_passing == '' || req.body.bach_percent == '' || req.body.bach_cource == '') {

        error = "Please fill all require Detail in Education Details"
        res.render('job_appli/form', { data: req.body, error, inserted_id: '' });

        return;


    }
    if (hasNumber(req.body.ssc_board) || year(req.body.ssc_passing) || isPercent(req.body.ssc_percent) || hasNumber(req.body.hsc_board) || year(req.body.hsc_passing) || isPercent(req.body.hsc_percent) || hasNumber(req.body.bach_uni) || year(req.body.bach_passing) || isPercent(req.body.bach_percent) || hasNumber(req.body.bach_cource) || (req.body.mast_uni != '' && hasNumber(req.body.mast_uni)) || (req.body.mast_passing != '' && year(req.body.mast_passing)) || (req.body.mast_percent != '' && isPercent(req.body.mast_percent)) || (req.body.mast_cource != '' && hasNumber(req.body.mast_cource))) {

        error = "Please fill correct Detail in Education Details"
        res.render('job_appli/form', { data: req.body, error, inserted_id: '' });

        return;


    }
    if (req.body.mast_uni != '' || req.body.mast_passing != '' || req.body.mast_percent != '' || req.body.mast_cource != '') {

        if (req.body.mast_uni != '' && req.body.mast_passing != '' && req.body.mast_percent != '' && req.body.mast_cource != '') {

        }
        else {

            error = "Please fill All Detail of Masters in Education Details"
            res.render('job_appli/form', { data: req.body, error, inserted_id: '' });

            return;
        }
    }


    //work-exp
    if (req.body.comp != undefined) {
        var work_len = req.body.comp.length;

        for (i = 0; i < work_len; i++) {

            if (req.body.comp[i] != '' || req.body.des[i] != '' || req.body.from[i] != '' || req.body.to[i] != '') {
                if (req.body.comp[i] != '' && req.body.des[i] != '' && req.body.from[i] != '' && req.body.to[i] != '') {

                }
                else {
                    error = `Please fill All Detail of company${i} in work experiance`
                    res.render('job_appli/form', { data: req.body, error, inserted_id: '' });

                }
            }
        }
    }



    // language

    if (req.body.hindi != undefined && req.body.hindi.length == 1) {
        error = "please select language Experties too";
        res.render('job_appli/form', { data: req.body, error, inserted_id: '' });
        return;
    }
    if (req.body.english != undefined && req.body.english.length == 1) {
        error = "please select language Experties too";
        res.render('job_appli/form', { data: req.body, error, inserted_id: '' });
        return;
    }
    if (req.body.gujarati != undefined && req.body.gujarati.length == 1) {
        error = "please select language Experties too";
        res.render('job_appli/form', { data: req.body, error, inserted_id: '' });
        return;
    }

    if (req.body.hindi != undefined && req.body.english != undefined && req.body.gujarati != undefined) {
        error = "Please check any language"
        res.render('job_appli/form', { data: req.body, error, inserted_id: '' });
        return;
    }



    //tech
    if (req.body.php != undefined && req.body.php.length == 1) {
        error = "please select technology Experties too";
        res.render('job_appli/form', { data: req.body, error, inserted_id: '' });
        return;
    }
    if (req.body.mysql != undefined && req.body.mysql.length == 1) {
        error = "please select technology Experties too";
        res.render('job_appli/form', { data: req.body, error, inserted_id: '' });
        return;
    }
    if (req.body.laravel != undefined && req.body.laravel.length == 1) {
        error = "please select technology Experties too";
        res.render('job_appli/form', { data: req.body, error, inserted_id: '' });
        return;
    }
    if (req.body.oracle != undefined && req.body.oracle.length == 1) {
        error = "please select technology Experties too";
        res.render('job_appli/form', { data: req.body, error, inserted_id: '' });
        return;
    }




    next();

}
module.exports = server_val;