var suncalc = require('suncalc')
/*
Function that callbacks a JSON Object with
todays sunset/sundown for specified coordinates

Run raspi-config and set your timezone!!
*/

function fetchdata(lat, lng, callback) {
	var date = new Date('2013-08-01UTC');
	var times = suncalc.getTimes(new Date(), lat, lng);
	var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
	var sunsetStr = times.sunset.getHours() + ':' + times.sunset.getMinutes();
	var dawndusk = [
		{
			'sunrise' : sunriseStr,
			'sunset' : sunsetStr
		}
	];
	callback(dawndusk);
}

exports.fetchdata = fetchdata;

/* calling from other files
getDawnDusk = require('./sun')

// Hämtar solupp/nedgång för Örebros koordinater
getDawnDusk.fetchdata(59.274302, 15.209713, function (data) {
	console.log(data[0].sunrise);
	console.log(data[0].sunset);
});
*/

// Intergrate into mongodb to fetch this data once a day and store.
// Let another function check if devices are bound to be turn on/off
// at given sunrise or sunset defined in some settings panel or the Unit/Group view.
fetchdata(59.274302, 15.209713, function (data) {
	console.log('sun up: ' + data[0].sunrise);
	console.log('sun down: ' + data[0].sunset);
});