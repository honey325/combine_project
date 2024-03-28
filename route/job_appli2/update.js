var update_sql = require('./update_sql');
var query = require('../sql');

async function update(req, res) {

    console.log(req.body);
    var id = req.body.inserted_id;
    var dob = new Date(req.body.dob);
    var basic_detail = [
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
        dob,
        req.body.inserted_id
    ]

    var basic_detail_data = await update_sql(basic_detail, "basic_detail");

    // console.log(basic_detail_data);


    //schooling


    ssc = [


        req.body.ssc_board,
        req.body.ssc_passing,
        req.body.ssc_percent,
        id,
        "0",
    ]
    hsc = [

        req.body.ssc_board,
        req.body.ssc_passing,
        req.body.ssc_percent,
        id,
        "1",
    ]

    var ssc_data = await update_sql(ssc, "schooling");
    var hsc_data = await update_sql(hsc, "schooling")


    //clg


    bachlor = [

        req.body.bach_cource,
        req.body.bach_uni,
        req.body.bach_passing,
        req.body.bach_percent,
        id,
        "0",
    ]


    var clg_data = await update_sql(bachlor, "clg");

    if (req.body.mast_cource.length != 0) {
        master = [

            req.body.mast_cource,
            req.body.mast_uni,
            req.body.mast_passing,
            req.body.mast_percent,
            id,
            "1",
        ]
        clg_data += await update_sql(master, "clg")

    }

    //work_exp



    var work_data = {};
    if (req.body.comp != undefined) {
        for (i = 0; i < req.body.comp.length; i++) {
            if (req.body.comp[i].length != 0) {
                work = [

                    req.body.comp[i],
                    req.body.des[i],
                    new Date(req.body.from[i]),
                    new Date(req.body.to[i]),
                    id,
                    req.body.work_id[i]
                ]
                work_data += await update_sql(work, "work_exp");
            }
        }

    }


    //  //language 
    var lang_data




    var lang_delete = `delete from job_app_db_29.lang_kn where appli_id = ${id};`;
    data = await query(lang_delete);
    var lang = [];
    var lang_level = [];
    var arr = [];
    if (req.body.hindi != undefined) {
        for (let i = 1; i < req.body.hindi.length; i++) {

            lang.push(req.body.hindi[0])
            lang_level.push(req.body.hindi[i])


        }
    }
    if (req.body.english != undefined) {
        for (let i = 1; i < req.body.english.length; i++) {

            lang.push(req.body.english[0])
            lang_level.push(req.body.english[i])

        }
    }
    if (req.body.gujarati != undefined) {
        for (let i = 1; i < req.body.gujarati.length; i++) {
            lang.push(req.body.gujarati[0]);
            lang_level.push(req.body.gujarati[i]);
        }
    }
    arr.push(id)
    arr.push(lang);
    arr.push(lang_level);
    lang_data = await update_sql(arr, "lang");
    // console.log(arr[1][1]);
    console.log(lang_data);

    //tech


    var tech = [];
    var tech_level = [];


    if (req.body.php != undefined) {
        tech.push(req.body.php[0])
        tech_level.push(req.body.php[1])
    }
    if (req.body.mysql != undefined) {
        tech.push(req.body.mysql[0])
        tech_level.push(req.body.mysql[1])
    }
    if (req.body.laravel != undefined) {
        tech.push(req.body.laravel[0])
        tech_level.push(req.body.laravel[1])
    }
    if (req.body.oracle != undefined) {
        tech.push(req.body.oracle[0])
        tech_level.push(req.body.oracle[1])
    }
    arr = []
    arr.push(id)
    arr.push(tech);
    arr.push(tech_level);
    tech_data = update_sql(arr, "tech");
    // console.log(arr[1][1]);


    //ref
    if (req.body.ref_name != undefined) {

    var ref_data = []
    for (let i = 0; i < req.body.ref_name.length; i++) {

        if (req.body.ref_name[i].length != 0) {
            ref = [
                req.body.ref_name[i],
                req.body.ref_contact[i],
                req.body.relation[i],
                id,
                req.body.ref_id[i]
            ]
            ref_data += await update_sql(ref, "ref");
        }
    }
    }
    //preferances



    pref = [

        req.body.pref_loc1,
        req.body.pref_loc2,
        req.body.pref_loc3,
        req.body.notice,
        req.body.ctc_exp,
        req.body.ctc_cur,
        `${req.body.dept}`,
        id
    ]
    pref_data = await update_sql(pref, "pref");

    // var msg = `successfully update for id ${id}`;
    res.json({ msg : `successfully update for id ${id}`})


}
module.exports = update;