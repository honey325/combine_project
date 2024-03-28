var query = require('../sql')
function insert(arr, table) {
    if (table == "pref") {
        pref_sql = `INSERT INTO preferance (appli_id, pref_loc_1, pref_loc_2, pref_loc_3, notice_period, expected_ctc, current_ctc, department) VALUES (?,?,?,?,?,?,?,?);`
        pref_data = query(pref_sql, arr);

    }
  
}

module.exports = insert