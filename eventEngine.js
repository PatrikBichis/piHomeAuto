var suncalc = require('suncalc');
var control = require('piHomeAutoControl').control();
var eventEngine = require('piHomeAutoConfig').piHomeAutoConfig().eventEngine;
var homeInfo = require('piHomeAutoConfig').piHomeAutoConfig().homeInfo;

var db = null;

exports.initEventEngine = function(db){
	db = db;
	setTimeout(runEventEngine, eventEngine.pollRate);
};

var runEventEngine = function(){
	// Intergrate into mongodb to fetch this data once a day and store.
	// Let another function check if devices are bound to be turn on/off
	// at given sunrise or sunset defined in some settings panel or the Unit/Group view.
	fetchdata(homeInfo.Latitude, homeInfo.Longitude, function (sunData) {
		checkAllGroups(function(){
			initEventEngine();
		}, control.groups, control.groups.length, 0, sunData);
	});
}

var checkAllGroups = function(callback, array, length, i, sunData){
	var callback = callback;
	var array = array;
	var length = length;
	var i = i;
	var sunData = sunData;

	if(length <= i){
		checkGroup(function(){
			checkAllGroups(callback, array, length, i++, sunData);
		}, array[i]), sunData;
	}else{
		callback();
	}

}

var checkGroup = function(callback, Group, sunData){

	var onAction = Group.onAction;
	var now = new Date.now();
	var onTime = new Date.now();
	var offTime = new Date.now();
	var on = false;
	var off = false;

	if(onAction.useTime){

		onTime.setHours(onAction.time.hours);
		onTime.setMinutes(onAction.time.minutes);
		onTime.setSeconds(onAction.time.seconds);

		if(now > onTime){
			onTime.setMilliseconds(onTime.getMilliseconds()+(eventEngine.pollRate*2);
			if(now > onTime){
				on = true;
			}

		}
	}

	if(offAction.useTime){

		offTime.setHours(offAction.time.hours);
		offTime.setMinutes(offAction.time.minutes);
		offTime.setSeconds(offAction.time.seconds);

		if(now > offTime){
			offTime.setMilliseconds(offTime.getMilliseconds()+(eventEngine.pollRate*2);
			if(now > offTime){
				off = true;
			}

		}
	}

	if(on){
		var data = {};
		control.setGroup(function(){
			if(off){
				control.setGroup(function(){
					callback();
				},data);
			}else{
				callback();
			}
		},data);
	}else{
		callback();
	}
	
}

