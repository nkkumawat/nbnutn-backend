var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket_io = require( "socket.io" );
var pandingMessages = require('./model/pandingmessages');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');
var sent = 400;

var cons = require('consolidate');
var app = express();
var io = socket_io();
app.io = io;

var index = require('./routes/index');
var sendmessage = require('./routes/sendmessage')(io);
var getallmessages = require('./routes/getallmessages')(io);
var signup = require('./routes/signup');
var sendotp = require('./routes/sendotp');
var matchcontact = require('./routes/matchcontact');

io.on("connection", function(socket) {
    console.log( "A user connected" );
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on("receive-message" , function(data){
        console.log(data);
        //  var msg = {
        //     message: message,
        //     receiver: receiver,
        //     sender : sender
        // };
        io.emit('send-message', data);
        // var panding = pandingMessages({
        //     mobile: receiver,
        //     message: message,
        //     sender : sender
        // });
        // panding.save(function (err) {
        //     if (err) console.log(err);
        //     console.log('User saved successfully!');
        // });
    });
});

// view engine setup

app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', index);
app.use('/sendmessage', sendmessage);
app.use('/getallmessages', getallmessages);
app.use('/signup', signup);
app.use('/sendotp', sendotp);
app.use('/matchcontact', matchcontact);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
