var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const apienv = "prod"

const http = require('http');
const https = require('https');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var sercovid2 = require('./routes/sercovid2')
var telechar = require('./routes/telechargement')
var scrapper = require('./routes/scrapper')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/sercovid2', sercovid2);
app.use('/telechargement', telechar);
app.use('/scrapper', scrapper);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


var devurlApi = 'http://localhost:4545/scrapper'
var produrlApi = 'https://heroku-sercovid2.herokuapp.com/scrapper'

var devInterval = 10000
var prodInterval = 5000

if (apienv == "dev") {
    urlApi = devurlApi
    apinterval = devInterval

        http.get(urlApi, (resp) => {
            console.log("Les statisques ont été mises à jour...")
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        })
    setInterval(() => {

        http.get(urlApi, (resp) => {
            console.log("Les statisques ont été mises à jour...")
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        })
        console.log("Hello http");
    }, apinterval);
} else {
    urlApi = produrlApi
    apinterval = prodInterval

        https.get(urlApi, (resp) => {
            console.log("Les statisques ont été mises à jour...")
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        })
    setInterval(() => {

        https.get(urlApi, (resp) => {
            console.log("Les statisques ont été mises à jour...")
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        })
        console.log("Hello https");
    }, apinterval);
}

module.exports = app;