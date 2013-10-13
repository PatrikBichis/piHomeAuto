var mongoose = require('mongoose');

var schema = mongoose.Schema({
	_id: Number,
	name: String,
	protocol: String,
	model: String,
	house: Number,
	unit: Number,
	currentvalue: Boolean,
	map_x: Number,
	map_y: Number
});


module.exports = mongoose.model('Unit', schema);
