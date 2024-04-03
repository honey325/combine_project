var query = require('../../sql');
var update = require('./update');

async function insert(req, res) {


  try {
    // basic_detail
    let basic_detail = [

      req.body.firstname,
      req.body.lastname,
      req.body.designation,
      req.body.addr_1,
      req.body.addr_2,
      req.body.city,
      req.body.state,
      req.body.email,
      req.body.contact,
      req.body.gender,
      req.body.zipcode,
      req.body.rela_status,
      req.body.dob
    ]

    let basic_detail_sql = `INSERT INTO basic_detail (appli_id, first_name, last_name, designation, addr1, addr2, city, state, email, contact, gender, pincode, relationship_status, dob) VALUES (default,?,?,?,?,?,?,?,?,?,?,?,?,?)`;


    let basic_detail_data = await query(basic_detail_sql, basic_detail);




    let id = basic_detail_data.result.insertId;








    // schoolllingg


    let ssc = [
      id,
      "0",
      req.body.ssc_board,
      req.body.ssc_passing,
      req.body.ssc_percent
    ]
    let hsc = [
      id,
      "1",
      req.body.ssc_board,
      req.body.ssc_passing,
      req.body.ssc_percent
    ]
    let schooling_sql = `INSERT INTO schooling (appli_id, class, board_name, passing_year, percent) VALUES (?, ?, ?, ?, ?);`

    let ssc_data = await query(schooling_sql, ssc);
    let hsc_data = await query(schooling_sql, hsc);









    // clg

    let bachlor = [
      id,
      "0",
      req.body.bach_cource,
      req.body.bach_uni,
      req.body.bach_passing,
      req.body.bach_percent
    ]

    let clg_sql = `INSERT INTO clg (appli_id,bech_mast,course,uni, passing_year, percent) VALUES (?,?,?,?,?,?);`

    let clg_data = await query(clg_sql, bachlor);

    if (req.body.mast_cource.length != 0) {
      let master = [
        id,
        "1",
        req.body.mast_cource,
        req.body.mast_uni,
        req.body.mast_passing,
        req.body.mast_percent
      ]
      clg_data += await query(clg_sql, master);

    }

    //work exp

    let work_sql = `INSERT INTO work_exp (idx,appli_id, company, design, fr_date, to_date) VALUES (default,?,?,?,?,?);`
    let work_data = {}


    for (i = 0; i < req.body.comp.length; i++) {
      if (req.body.comp[i].length != 0) {
        let work = [
          id,
          req.body.comp[i],
          req.body.des[i],
          req.body.from[i],
          req.body.to[i]
        ]
        work_data += await query(work_sql, work);
      }
    }







    //language 

    let lang_sql = `INSERT INTO lang_kn (appli_id, lang, edu_level) VALUES (?,?,?);`;
    let lang_data = [];
    if (req.body.hindi != undefined) {
      for (let i = 1; i < req.body.hindi.length; i++) {
        let hindi = [
          id,
          req.body.hindi[0],
          req.body.hindi[i]
        ]
        lang_data += await query(lang_sql, hindi);
      }
    }
    if (req.body.english != undefined) {
      for (let i = 1; i < req.body.english.length; i++) {
        let english = [
          id,
          req.body.english[0],
          req.body.english[i]
        ]
        lang_data += await query(lang_sql, english);
      }
    }
    if (req.body.gujarati != undefined) {
      for (let i = 1; i < req.body.gujarati.length; i++) {
        let gujarati = [
          id,
          req.body.gujarati[0],
          req.body.gujarati[i]
        ]
        lang_data += await query(lang_sql, gujarati);
      }
    }








    // technology

    let tech_sql = `INSERT INTO tech_kn (appli_id, tech, kn_level) VALUES (?,?,?);`


    let tech_data = [];
    if (req.body.php != undefined) {
      let php = [
        id,
        req.body.php[0],
        req.body.php[1]
      ]
      tech_data += await query(tech_sql, php);
    }
    if (req.body.mysql != undefined) {
      let mysql = [
        id,
        req.body.mysql[0],
        req.body.mysql[1]
      ]
      tech_data += await query(tech_sql, mysql);
    }
    if (req.body.laravel != undefined) {

      let laravel = [
        id,
        req.body.laravel[0],
        req.body.laravel[1]
      ]
      tech_data += await query(tech_sql, laravel);
    }
    if (req.body.oracle != undefined) {

      let oracle = [
        id,
        req.body.oracle[0],
        req.body.oracle[1]
      ]
      tech_data += await query(tech_sql, oracle);
    }







    // referance contact


    let ref_data = []
    let ref_sql = `INSERT INTO ref_cont(idx,appli_id,n_ame,contact,relation) VALUES (default,?,?,?,?);`
    for (let i = 0; i < req.body.ref_name.length; i++) {

      if (req.body.ref_name[i].length != 0) {
        let ref = [
          id,
          req.body.ref_name[i],
          req.body.ref_contact[i],
          req.body.relation[i]
        ]
        ref_data += await query(ref_sql, ref);


      }
    }








    // prefrance

    let pref_sql = `INSERT INTO preferance (appli_id, pref_loc_1, pref_loc_2, pref_loc_3, notice_period, expected_ctc, current_ctc, department) VALUES (?,?,?,?,?,?,?,?);`

    let pref = [
      id,
      req.body.pref_loc1,
      req.body.pref_loc2,
      req.body.pref_loc3,
      req.body.notice,
      req.body.ctc_exp,
      req.body.ctc_cur,
      `${req.body.dept}`,
    ]
    let pref_data = query(pref_sql, pref);


  }
  catch (e) {

    res.render('form', { data: req.body, error: e });
    return;
  }
  // let temp = req.body;
  // temp['inserted_id'] = id;
  res.json(id)
}

module.exports = insert;