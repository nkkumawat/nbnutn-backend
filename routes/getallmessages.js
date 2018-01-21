module.exports = function(io) {
    var express = require('express');
    var router = express.Router();
    var panding = require('../model/pandingmessages');
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/chat');
    var sent = 400;

    router.post('/', function (req, res, next) {
        var mobile = req.body.mobile;
        console.log(mobile);
        panding.find({mobile : mobile}, function(err, panding) {
            if (err) {
                return res.json({
                    status: 400,
                    body: {}
                });
            } else {
                sent = 200;
                var response = {
                    status: 200,
                    body: panding
                };
                panding.forEach( function (doc) {
                    doc.remove();
                    console.log("removed");
                });
               return  res.json(response);
            }
        });
    } );


    return router;
};
