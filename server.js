var express = require('express');
var mysql = require('mysql');
var app = express();
var path = require('path');
var port = 8080;


app.set('view engine', 'ejs');


app.use(express.static('public'))


app.listen(port,()=>{
    console.log('server is running');
})

