module.exports = function(io) {
    var express = require('express');
    var router = express.Router();
    var pandingMessages = require('../model/pandingmessages');
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/chat');
    var sent = 400;
    router.post('/', function (req, res, next) {
        var message = req.body.message;
        var receiver = req.body.receiver;
        var sender = req.body.sender;
        var msg = {
            message: message,
            receiver: receiver,
            sender : sender
        };
        io.to(receiver).emit('send-message', msg);
        var panding = pandingMessages({
            mobile: receiver,
            message: message,
            sender : sender
        });
        panding.save(function (err) {
            if (err) console.log(err);
            console.log('User saved successfully!');
            sent = 200;
            next();
        });
    }, function (req , res) {
        res.json ({status : sent});
    });
    return router;
};
