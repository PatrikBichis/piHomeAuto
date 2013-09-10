var dawndusk = require('./routes/api/sun.js');
var control = require('piHomeAutoControl').control();
var eventEngine = require('piHomeAutoConfig').piHomeAutoConfig().eventEngine;
var homeInfo = require('piHomeAutoConfig').piHomeAutoConfig().homeInfo;

var db = null;

exports.initEventEngine = function(db){
	db = db;
	console.log("Event engine is init..");
	init();
};

var init = function(){
	setTimeout(runEventEngine, eventEngine.pollRate);
}

var runEventEngine = function(){
	// Intergrate into mongodb to fetch this data once a day and store.
	// Let another function check if devices are bound to be turn on/off
	// at given sunrise or sunset defined in some settings panel or the Unit/Group view.
	dawndusk.fetchdata(homeInfo.Latitude, homeInfo.Longitude, function (sunData) {
		checkAllGroups(function(){
			init();
		}, control.groups, control.groups.length, 0, sunData);
	});
}

var checkAllGroups = function(callback, array, length, i, sunData){
	var callback = callback;
	var array = array;
	var length = length;
	var i = i;
	var sunData = sunData;

	if(i < length){
		checkGroup(function(){
			checkAllGroups(callback, array, length, i + 1, sunData);
		}, array[i]), sunData;
	}else{
		callback();
	}

}

var checkAction = function(callback, state, stateValue, action, name){
	var Time = new Date;
	var now = new Date;

	if(action.useTime){

		//console.log("Check on time event " + Group.name);

		if(action.time.length > 0){
			Time.setHours(action.time[0].hours, action.time[0].minutes, action.time[0].seconds);

			if(now > Time){
				Time.setMilliseconds(Time.getMilliseconds()+eventEngine.pollRate);
				if(now < Time){
					if(state){
						stateValue.on = true;
					}else{
						stateValue.off = true;
					}
					
					console.log("On timer event " + name);
				}

			}
		}	
	}

	callback(stateValue);
}

var checkGroup = function(callback, Group, sunData){

	var onAction = Group.onAction;
	var offAction = Group.offAction;
	var now = new Date;
	var onTime = new Date;
	var offTime = new Date;

	var state = {on:false,off:false};

	//console.log("Check events for group " + Group.name);
	checkAction(function(state){
		state = state;
		checkAction(function(state){
			state = state;

			var data = {units : Group.units, value : false};

			if(state.on){
				data.value = true;
				control.setGroup(function(){
					if(state.off){
						control.setGroup(function(){
							callback();
						},data);
					}else{
						callback();
					}
				},data);
			}else if(state.off){
				control.setGroup(function(){
					callback();
				},data);	
			}else{
				callback();
			}
		}, false, state, Group.offAction, Group.name);
	}, true, state, Group.onAction, Group.name);

	/*
	if(onAction.useTime){

		//console.log("Check on time event " + Group.name);

		if(onAction.time.length > 0){
			onTime.setHours(onAction.time[0].hours, onAction.time[0].minutes, onAction.time[0].seconds);

			if(now > onTime){
				onTime.setMilliseconds(onTime.getMilliseconds()+eventEngine.pollRate);
				if(now < onTime){
					state.on = true;
					console.log("On timer event " + Group.name);
				}

			}
		}	
	}

	if(offAction.useTime){

		//console.log("Check off time event " + Group.name);

		if(offAction.time.length > 0){
			offTime.setHours(offAction.time[0].hours, offAction.time[0].minutes, offAction.time[0].seconds);

			if(now > offTime){
				offTime.setMilliseconds(offTime.getMilliseconds()+eventEngine.pollRate);
				if(now < offTime){
					state.off = true;
					console.log("Off timer event " + Group.name);
				}

			}
		}
	}

	var data = {units : Group.units, value : false};

	if(state.on){
		data.value = true;
		control.setGroup(function(){
			if(state.off){
				control.setGroup(function(){
					callback();
				},data);
			}else{
				callback();
			}
		},data);
	}else if(state.off){
		control.setGroup(function(){
			callback();
		},data);	
	}else{
		callback();
	}
	//console.log("Events for groupe" + Group.name + " On:"+on+", Off:"+off);
	//callback();
	*/
}

