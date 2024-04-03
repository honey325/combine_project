var jwt = require('jsonwebtoken');


function check_login(req, res) {
    try {

        let token = req.cookies.token;

        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (verified) {
           res.json("1")
            
        } else {
           res.json('0');
        }
    } catch (error) {
        res.json('0');
    }
}
module.exports = check_login