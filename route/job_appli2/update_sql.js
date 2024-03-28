var query = require('../sql');
var insert = require('./pref_insert');
async function update_sql(arr, table) {

    var data = {};

    if (table == "basic_detail") {

        // console.log(arr);

        var sql = `update job_app_db_29.basic_detail set first_name = ?, last_name = ?, designation = ?, addr1 = ?, addr2 = ?, city = ?, state = ?, email = ?, contact = ?, gender = ?, pincode  =?, relationship_status = ?, dob= ? where appli_id = ?`;

        data = await query(sql, arr);
        return { result: data.result };
    }
    else if (table == "schooling") {
        sql = `update job_app_db_29.schooling set board_name =?, passing_year = ?, percent = ? where appli_id = ? && class = ?`;

        data = await query(sql, arr);
        return { result: data.result };
    }
    else if (table == "clg") {
        sql = `update job_app_db_29.clg set course=?,uni=?, passing_year =?, percent = ? where appli_id= ? && bech_mast =?;`
        data = await query(sql, arr)
        return { result: data.result };
    }
    else if (table == "work_exp") {
        sql = `update job_app_db_29.work_exp set company=?, design=?, fr_date = ? , to_date = ? where appli_id =? && idx = ?;`
        data = await query(sql, arr);
        return { result: data.result };
    }
    else if (table == "ref") {
        sql = `update job_app_db_29.ref_cont set n_ame=?,contact=?,relation=? where appli_id=? && idx = ?`
        data = await query(sql, arr);
        return { result: data.result };
    }

    else if (table == "pref") {
        sql = `update job_app_db_29.preferance set pref_loc_1 =?, pref_loc_2=?, pref_loc_3=?, notice_period =?, expected_ctc =?, current_ctc=?, department = ? where appli_id = ?`
        data = await query(sql, arr);
        if (data.result.affectedRows == 0) {
            var insert_arr = [arr[7], arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]]
            insert(insert_arr, "pref");
        }
        return { result: data.result };

    }
    else if (table == "lang") {
        console.log(123);
        sql = `INSERT INTO job_app_db_29.lang_kn (appli_id, lang, edu_level) VALUES (?,?,?);`;
        data = {};
        for (i = 0; i < arr[2].length; i++) {
            new_arr = [arr[0], arr[1][i], arr[2][i]]
            data += await query(sql, new_arr)
            console.log(data);
        }
        return { result: data.result };
    }
    else if (table == "tech") {
        var tech_delete = `delete from job_app_db_29.tech_kn where appli_id = ${arr[0]};`
        var sql = `INSERT INTO job_app_db_29.tech_kn (appli_id, tech, kn_level) VALUES (?,?,?);`
        data = await query(tech_delete);
        console.log(data);
        for (i = 0; i < arr[2].length; i++) {
            new_arr = [arr[0], arr[1][i], arr[2][i]]
            data += await query(sql, new_arr)
        }
        return { result: data.result };
    }

    


}

module.exports = update_sql;