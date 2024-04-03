var select_sql = require('../../controller/job_appli2/select_sql');


async function getdata(req, res) {

  let id = req.query.id;

  if (id == undefined || id == '') {
    id = '';

  }

  try {
    let basic_detail = await select_sql(id, `basic_detail`);
    let schooling = await select_sql(id, `schooling`);
    let clg = await select_sql(id, `clg`);
    let work_exp = await select_sql(id, `work_exp`);
    let lang_kn = await select_sql(id, `lang_kn`);
    let tech_kn = await select_sql(id, `tech_kn`);
    let ref_cont = await select_sql(id, `ref_cont`);
    let preferance = await select_sql(id, `preferance`);



    let work_id = [];
    let company = [];
    let desig = [];
    let from_date = [];
    let to_date = [];
    work_exp.result.forEach(ele => {
      work_id.push(ele.idx);
      company.push(ele.company);
      desig.push(ele.design);
      from_date.push(ele.fr_date);
      to_date.push(ele.to_date);

    });


    let ref_name = [];
    let ref_contact = [];
    let ref_relation = [];
    let ref_id = [];

    ref_cont.result.forEach(ele => {

      ref_id.push(ele.idx);
      ref_name.push(ele.n_ame);
      ref_contact.push(ele.contact);
      ref_relation.push(ele.relation);
    });


    let lang = [];
    let edu_level = [];

    lang_kn.result.forEach(ele => {
      lang.push(ele.lang);
      edu_level.push(ele.edu_level);
    });
    let tech = [];
    let kn_level = [];
    tech_kn.result.forEach(ele => {
      tech.push(ele.tech);
      kn_level.push(ele.kn_level);
    });

    let data = {
      inserted_id: id,
      firstname: (basic_detail.result[0] == undefined ? '' : basic_detail.result[0].first_name),
      lastname: (basic_detail.result[0] == undefined ? '' : basic_detail.result[0].last_name),
      designation: (basic_detail.result[0] == undefined ? '' : basic_detail.result[0].designation),
      addr_1: (basic_detail.result[0] == undefined ? '' : basic_detail.result[0].addr1),
      email: (basic_detail.result[0] == undefined ? '' : basic_detail.result[0].email),
      addr_2: (basic_detail.result[0] == undefined ? '' : basic_detail.result[0].addr2),
      contact: (basic_detail.result[0] == undefined ? '' : basic_detail.result[0].contact),
      zipcode: (basic_detail.result[0] == undefined ? '' : basic_detail.result[0].pincode),
      dob: (basic_detail.result[0] == undefined ? '' : basic_detail.result[0].dob),
      gender: (basic_detail.result[0] == undefined ? '' : basic_detail.result[0].gender),
      city: (basic_detail.result[0] == undefined ? '' : basic_detail.result[0].city),
      state: (basic_detail.result[0] == undefined ? '' : basic_detail.result[0].state),
      rela_status: (basic_detail.result[0] == undefined ? '' : basic_detail.result[0].relationship_status),
      ssc_board: (schooling.result[0] == undefined ? '' : schooling.result[0].board_name),
      ssc_passing: (schooling.result[0] == undefined ? '' : schooling.result[0].passing_year),
      ssc_percent: (schooling.result[0] == undefined ? '' : schooling.result[0].percent),
      hsc_board: (schooling.result[1] == undefined ? '' : schooling.result[1].board_name),
      hsc_passing: (schooling.result[1] == undefined ? '' : schooling.result[1].passing_year),
      hsc_percent: (schooling.result[1] == undefined ? '' : schooling.result[1].percent),
      bach_cource: (clg.result[0] == undefined ? '' : clg.result[0].course),
      bach_uni: (clg.result[0] == undefined ? '' : clg.result[0].uni),
      bach_passing: (clg.result[0] == undefined ? '' : clg.result[0].passing_year),
      bach_percent: (clg.result[0] == undefined ? '' : clg.result[0].percent),
      mast_cource: (clg.result[1] == undefined ? '' : clg.result[1].course),
      mast_uni: (clg.result[1] == undefined ? '' : clg.result[1].uni),
      mast_passing: (clg.result[1] == undefined ? '' : clg.result[1].passing_year),
      mast_percent: (clg.result[1] == undefined ? '' : clg.result[1].percent),
      work_id: work_id,
      comp: company,
      des: desig,
      from: from_date,
      to: to_date,
      lang: lang,
      edu_level: edu_level,
      tech: tech,
      kn_level: kn_level,
      ref_id: ref_id,
      ref_name: ref_name,
      ref_contact: ref_contact,
      relation: ref_relation,
      pref_loc1: (preferance.result[0] == undefined ? '' : preferance.result[0].pref_loc_1),
      pref_loc2: (preferance.result[0] == undefined ? '' : preferance.result[0].pref_loc_2),
      pref_loc3: (preferance.result[0] == undefined ? '' : preferance.result[0].pref_loc_3),
      notice: (preferance.result[0] == undefined ? '' : preferance.result[0].notice_period),
      ctc_exp: (preferance.result[0] == undefined ? '' : preferance.result[0].expected_ctc),
      ctc_cur: (preferance.result[0] == undefined ? '' : preferance.result[0].current_ctc),
      dept: (preferance.result[0] == undefined ? '' : preferance.result[0].department),
      submit: 'SUBMIT',
    }
    res.json(data);
  }
  catch (e) {
    res.render('home', { data: [], data_header: [], error: e, inserted_id: '' })
    return;
  }


  // req.data = data;
  
  // next();
}
module.exports = getdata;