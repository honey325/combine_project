var express = require('express');
var app = express();
const route  = require('./route');
var port = 8080;

require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.use(express.static('public'))

app.use(route)

app.listen(port,()=>{
    console.log('server is running');
})

