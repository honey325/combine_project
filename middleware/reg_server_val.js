
function reg_val(req, res, next) {
  
    

    function is_string(field){
        return /\d/.test(field)
    }
    function is_user(field){
        var user_regex = /^[A-Za-z0-9_\.].{5,}$/;
        return !(user_regex.test(field));
    }
    function is_email(field){
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return !(emailRegex.test(field));
    }
    function is_contact(field){
       return (isNaN(parseInt(field)) || field.length != 10 || field.indexOf('.') != -1);
    }


    if (req.body.uname == '' || req.body.fname == '' || req.body.lname == '' || req.body.email == '' || req.body.contact == '') {
        res.json('Please fill All the Details');
        return;
    }
    else if(is_string(req.body.fname) || is_string(req.body.lname) || is_user(req.body.uname) || is_email(req.body.email)||is_contact(req.body.contact)){
        res.json('Please Enter valid input');
        return;
    }
    else {
        next();
    }
}
module.exports = reg_val