var jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    try {

        var token = req.cookies.token;

        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (verified) {
            next();
            
        } else {
            // Access Denied
            res.render('login',{error : "Something went wrong Login Again"})
            // return;
        }
    } catch (error) {
        // Access Denied
        res.render('login',{error : "Something went wrong Login Again"})
        // return;
    }
}


module.exports = checkAuth;