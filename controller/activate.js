var query = require('./sql')
var err = {}
async function activate(req, res) {
  try {
    let code = req.query.code;
    let uname = req.query.uname;
    let sql = `select * from users where uname = '${uname}'`
    let data = await query(sql);

    let d = new Date();
    let date = new Date(data.result[0].createAt)


    if (req.url.split('?')[0] == '/activate') {
      if (data.result[0].status == 1) {
        err = { error: "Password Already Created" }
        res.render('create_pass', { err });
        return
      }
    }
    else if (Math.abs((d - date) / 1000 / 3600) > 3) {
      err = { error: "Your Link has been Expired!! Please Register Again" };
      let sql = `delete from users where uname = '${uname}'`
      data = await query(sql);
      res.render('create_pass', { err })
      return;
    }
    if (data.result[0].activation_code == code) {
      err = { msg: data.result[0].uname }
      res.render('create_pass', { err })
      return;
    }

  }
  catch (e) {
    err = { error: "something went wrong" }
    res.render('create_pass', { err });
  }
}
module.exports = activate