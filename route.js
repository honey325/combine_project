const express = require('express')
const router =  express.Router();
var checkAuth = require('./middleware/checkAuth');

router.get('/',(req,res)=>{
    res.render('login',{error:''});
});


router.get('/register',(req,res)=>{
    res.render('reg',{uname : '',error : ''});
})

const login = require('./middleware/login');
router.post('/',login,(req,res)=>{
    res.redirect('/dash');
});


router.get('/dash',checkAuth,(req,res)=>{
    res.render('dash');
});

var check_login = require('./route/api/check_login');
router.get('/check_login',check_login);

const register = require('./route/api/register');
const reg_val = require('./middleware/reg_server_val');
router.post('/register',reg_val,register);

const activate = require('./route/activate');
router.get('/activate',activate)

router.get('/crpass',(req,res)=>{
    var uname = req.body.uname
    res.render('create_pass',{uname,error :''});
})

const newpass = require('./route/api/newpass');
router.get('/newpass',newpass);

router.get('/forgot',activate)

const storepass = require('./route/api/storepass');
router.post('/updatepass',storepass);

router.get('/kukucube',checkAuth,(req,res)=>{res.render('kukucube/kuku_cube')});
router.get('/dynamic_table',checkAuth,(req,res)=>{res.render('dynamic_table/dynamic_table')});
router.get('/tic-tac-toe',checkAuth,(req,res)=>{res.render('tic-tac-toe/tic-tac-toe')});
router.get('/event',checkAuth,(req,res)=>{res.render('event/event_table')});

// searching grid 
const show = require('./route/search_grid/show');

router.get('/search_grid',show);

//result
const result = require('./route/result/result');
const marks = require('./route/result/marks');

router.get('/result',result)
router.get('/result/view',marks)


//dynamic_grid
const generate = require('./middleware/dynamic_grid/generate');
router.get('/dynamic_grid',generate,(req,res)=>{res.render('dynamic_grid/home')});


module.exports = router;