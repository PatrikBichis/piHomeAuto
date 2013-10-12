var mongoose = require('mongoose');

var schema = mongoose.Schema({
	_id: Number,
	name: String,
	protocol: String,
	model: String,
	house: Number,
	unit: Number,
	currentvalue: Boolean
});


module.exports = mongoose.model('Unit', schema);
