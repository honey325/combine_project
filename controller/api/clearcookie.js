function clearcookie(req,res){
    res.clearCookie('token');
    res.json('success')
}
module.exports = clearcookie;