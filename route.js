const express = require('express')
const router = express.Router();
var checkAuth = require('./middleware/checkAuth');

router.get('/', (req, res) => {
    res.render('login', { error: '' });
});


router.get('/register', (req, res) => {
    res.render('reg', { uname: '', error: '' });
})

const login = require('./middleware/login');
router.post('/', login, (req, res) => {
    res.redirect('/dash');
});


router.get('/dash', checkAuth, (req, res) => {
    res.render('dash');
});

var check_login = require('./route/api/check_login');
router.get('/check_login', check_login);

const register = require('./route/api/register');
const reg_val = require('./middleware/reg_server_val');
router.post('/register', reg_val, register);

const activate = require('./route/activate');
router.get('/activate', activate)

router.get('/crpass', (req, res) => {
    var uname = req.body.uname
    res.render('create_pass', { uname, error: '' });
})

const newpass = require('./route/api/newpass');
router.get('/newpass', newpass);

router.get('/forgot', activate)

const storepass = require('./route/api/storepass');
router.post('/updatepass', storepass);

router.get('/kukucube', checkAuth, (req, res) => { res.render('kukucube/kuku_cube') });
router.get('/dynamic_table', checkAuth, (req, res) => { res.render('dynamic_table/dynamic_table') });
router.get('/tic-tac-toe', checkAuth, (req, res) => { res.render('tic-tac-toe/tic-tac-toe') });
router.get('/event', checkAuth, (req, res) => { res.render('event/event_table') });

// searching grid 
const show = require('./route/search_grid/show');

router.get('/search_grid',checkAuth, show);

//result
const result = require('./route/result/result');
const marks = require('./route/result/marks');

router.get('/result',checkAuth, result)
router.get('/result/view',checkAuth, marks)


//dynamic_grid
const generate = require('./middleware/dynamic_grid/generate');
router.get('/dynamic_grid',checkAuth, generate, (req, res) => { res.render('dynamic_grid/home') });

//delimeter search
const search = require('./route/delimeter/search');
router.get('/delimeter_search',checkAuth, search);

//job_appli
const grid = require('./middleware/job_appli/grid');
const insert = require('./middleware/job_appli/insert');
const server_val = require('./middleware/job_appli/server_val');
const getdata = require('./middleware/job_appli/getdata');
const update = require('./middleware/job_appli/update');

router.get('/job_application',checkAuth, grid, (req, res) => {
    let data = req.data;
    let data_header = req.data_header;
    res.render('job_appli/home', { data, data_header, inserted_id: "", error: '' });
});

router.get('/job_application/insert',checkAuth, (req, res) => {
    var data = {
        inserted_id: '',
        firstname: '',
        lastname: '',
        designation: '',
        addr_1: '',
        email: '',
        addr_2: '',
        contact: '',
        zipcode: '',
        dob: '',
        gender: '',
        city: '',
        state: '',
        rela_status: '',
        ssc_board: '',
        ssc_passing: '',
        ssc_percent: '',
        hsc_board: '',
        hsc_passing: '',
        hsc_percent: '',
        bach_cource: '',
        bach_uni: '',
        bach_passing: '',
        bach_percent: '',
        mast_cource: '',
        mast_uni: '',
        mast_passing: '',
        mast_percent: '',
        work_id: [],
        comp: ['', ''],
        des: ['', ''],
        from: ['', ''],
        to: ['', ''],
        ref_id: [],
        ref_name: ['', ''],
        contact: ['', ''],
        relation: ['', ''],
        pref_loc1: '',
        pref_loc2: '',
        pref_loc3: '',
        notice: '',
        ctc_exp: '',
        ctc_cur: '',
        dept: '',
        submit: 'SUBMIT'
    }
    res.render('job_appli/form', { data, error: '', inserted_id: '' })
});
router.post('/job_application/update',checkAuth,server_val,update,grid,(req,res)=>{
    let data =req.data;
    let data_header = req.data_header;
    res.render('job_appli/home',{inserted_id:"",error:'Your Data Successfully Updated',data,data_header})
})

router.post('/job_application/insert',checkAuth,server_val,insert,grid,(req,res)=>{
    let inserted_id = req.body.inserted_id
    let data =req.data;
    let data_header = req.data_header;
    res.render('job_appli/home',{inserted_id,error :'',data,data_header})
})

router.get('/job_application/update',checkAuth,getdata,(req,res)=>{
    var data = req.data ; 
    var inserted_id = req.query.id;
    res.render('job_appli/form',{data,error:'',inserted_id})
})


module.exports = router;