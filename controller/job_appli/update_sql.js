var query = require('../sql');
var insert = require('./pref_insert');
async function update_sql(arr, table) {

  var data = {};

  if (table == "basic_detail") {

    let sql = `update basic_detail set first_name = ?, last_name = ?, designation = ?, addr1 = ?, addr2 = ?, city = ?, state = ?, email = ?, contact = ?, gender = ?, pincode  =?, relationship_status = ?, dob= ? where appli_id = ?`;

    data = await query(sql, arr);
    return { result: data.result };
  }
  else if (table == "schooling") {
    let = `update schooling set board_name =?, passing_year = ?, percent = ? where appli_id = ? && class = ?`;

    data = await query(sql, arr);
    return { result: data.result };
  }
  else if (table == "clg") {
    let sql = `update clg set course=?,uni=?, passing_year =?, percent = ? where appli_id= ? && bech_mast =?;`
    data = await query(sql, arr)
    return { result: data.result };
  }
  else if (table == "work_exp") {
    let sql = `update work_exp set company=?, design=?, fr_date = ? , to_date = ? where appli_id =? && idx = ?;`
    data = await query(sql, arr);
    return { result: data.result };
  }
  else if (table == "ref") {
    let sql = `update ref_cont set n_ame=?,contact=?,relation=? where appli_id=? && idx = ?`
    data = await query(sql, arr);
    return { result: data.result };
  }

  else if (table == "pref") {
    let sql = `update preferance set pref_loc_1 =?, pref_loc_2=?, pref_loc_3=?, notice_period =?, expected_ctc =?, current_ctc=?, department = ? where appli_id = ?`
    data = await query(sql, arr);
    if (data.result.affectedRows == 0) {
      var insert_arr = [arr[7], arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]]
      insert(insert_arr, "pref");
    }
    return { result: data.result };

  }
  else if (table == "lang") {

    let sql = `INSERT INTO lang_kn (appli_id, lang, edu_level) VALUES (?,?,?);`;
    data = {};
    for (i = 0; i < arr[2].length; i++) {
      let new_arr = [arr[0], arr[1][i], arr[2][i]]
      data += await query(sql, new_arr)

    }
    return { result: data.result };
  }
  else if (table == "tech") {
    var tech_delete = `delete from tech_kn where appli_id = ${arr[0]};`
    let sql = `INSERT INTO tech_kn (appli_id, tech, kn_level) VALUES (?,?,?);`
    data = await query(tech_delete);

    for (i = 0; i < arr[2].length; i++) {
      let new_arr = [arr[0], arr[1][i], arr[2][i]]
      data += await query(sql, new_arr)
    }
    return { result: data.result };
  }




}

module.exports = update_sql;