var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    mobile: { type: String , required : true },
    picture_url: { type: String , default : "https://png.pngtree.com/svg/20170602/0db185fb9c.png" },
},
	{timestamps: true}
);


var User = mongoose.model('User', user);

module.exports = User;