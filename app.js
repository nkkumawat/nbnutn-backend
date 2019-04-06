var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket_io = require( "socket.io" );
var pandingMessages = require('./model/pandingmessages');
var mongoose = require('mongoose');
var sent = 400;
var cons = require('consolidate');
var app = express();
var io = socket_io();


var connections =  new Map(); 
var connectionSocket =  new Map(); 

mongoose.connect('mongodb://localhost/chat');
app.io = io;

var index = require('./routes/index');
var sendmessage = require('./routes/sendmessage')(io);
var getallmessages = require('./routes/getallmessages')(io);
var signup = require('./routes/signup');
var sendotp = require('./routes/sendotp');
var matchcontact = require('./routes/matchcontact');

io.on("connection", function(socket) {
    console.log( "A user connected" );
    socket.on('join', function(data){
        console.log("user joined " + data);
        socket.join(data);
        connections.set(data, socket); 
        connectionSocket.set(socket , data);
    });
    socket.on('disconnect', function(){
        var numberToRemove = connectionSocket.get(socket);
        connectionSocket.delete(socket);
        connections.delete(numberToRemove);
        console.log('user disconnected');
    });
    socket.on("sent-by-device" , function(data){
        console.log(data, connections.size,connections.has(data.receiver.toString()));
        if(connections.has(data.receiver.toString())){
          io.to(data.receiver).emit('sent-by-server',data);
        }else {
           var panding = pandingMessages({
                    mobile:data.receiver,
                    sender: data.sender,
                    message: data.message,
                    message_type: "text",
                    media_type : data.media_type
            });
          panding.save(function (err) {
            if (err) console.log(err);
              console.log('Panding msgs saved successfully!');
          });
        }
    });
});

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

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
