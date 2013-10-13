var mongoose = require('mongoose');

var schema = mongoose.Schema({
	_id: Number,
	name: String,
	units: Number
});


module.exports = mongoose.model('Group', schema);
