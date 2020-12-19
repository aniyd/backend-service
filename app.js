let env = require('dotenv').config();
var createError = require('http-errors');
var http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

//Router List 
var login = require('./routes/login');
var patch = require('./routes/patch');
var generateThumbnail = require("./routes/generateThumbnail");
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
var httpServer = http.createServer(app);

//API GATEWAY LIST
app.use('/login', login);
app.use('/patch', patch);
app.use("/generateThumbnail", generateThumbnail);

var server = httpServer.listen(process.env.PORT,()=>{

});

module.exports = app;