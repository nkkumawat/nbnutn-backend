var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/user');
mongoose.connect('mongodb://localhost/chat');

router.post('/', function(req, res, next) {
    var mobile = req.body.mobile;
    var user = User({
        mobile:mobile
    });
    user.save(function (err , user) {
        if(err) {
            return res.json({
                status: 400,
                body: {}
            });
        }else {
            return res.json({
                status: 200,
                body: {}
            });
        }
    })
});

module.exports = router;
