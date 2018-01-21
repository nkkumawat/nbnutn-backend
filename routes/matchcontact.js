/**
 * Created by sonu on 13-Jan-18.
 */
const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');
var User = require('../model/user');
var sent = 400;

router.post('/', function(req, res, next) {
	var parsed = req.body.mobilenumbers;
	try {
		parsed = JSON.parse(parsed);
	}catch(err) {
		console.log(err);
	}
    var mobile = [];
    for(var x in parsed){
	  mobile.push(parsed[x]);
    }
    console.log(mobile.toString());
    //
    User.find({})
		.where('mobile').in(mobile)
		.exec(function(err, user) {
        if (err) {
        	 console.log(err);
            return res.json({
                status: 400,
                body: {}
            });
        } else {
        	 console.log(user);
            sent = 200;
            var response = {
                status: 200,
                body: user
            };
           return  res.json(response);
        }
    });
 });


module.exports = router;
