var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pandingSchema = new Schema({
    mobile: { type: String , required : true },
    sender: { type: String , required : true },
    message: { type: String}
});


var pandingMessages = mongoose.model('pandingSchema', pandingSchema);

module.exports = pandingMessages;