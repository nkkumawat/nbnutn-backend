var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    mobile: { type: String , required : true }
});


var User = mongoose.model('User', user);

module.exports = User;