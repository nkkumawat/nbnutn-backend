var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("hello world");

});

module.exports = router;
