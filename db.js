var MongoClient = require('mongodb').MongoClient;
var os = require('os');


if(process.platform === 'linux' || process.platform === 'darwin'){
	var networkInterfaces = os.networkInterfaces();
	var netadr = networkInterfaces.eth0[0].address;
	console.log('connected to: ' + netadr);
}

var ServerUrl = 'mongodb://' + netadr + ':27017/piHomeAuto';

function database() {
	if (arguments.callee._singletonInstance){
 		return arguments.callee._singletonInstance;
	}
 	arguments.callee._singletonInstance = this;

 	this.con = function(operation,data,options,callback) {
		console.log('connecting..');
		MongoClient.connect(ServerUrl, function(err,db) {
			if(err) throw err;
			if (operation == null || operation == undefined)
				callback('No operation specified');
			else if (operation == 'addUnit') {
				db.collection('units').insert(data, function(err,inserted) {
					if(err) throw err;
					callback(inserted);	
					db.close();
				});	
			}
			else if (operation == 'removeUnit') {
				db.collection('units').remove(data, function(err,removed) {
					if(err) throw err;
					callback(removed);	
					db.close();
				});	
			}
			//Finds current state and calls setCurrentValue
			else if (operation == 'toggleCurrentValue') {
				db.collection('units').findOne(data, options, function(err,docs) {
					if(err) throw err;
					callback(docs);	
					db.close();
				});	
			}
			//Setfunction
			else if (operation == 'setCurrentValue') {
				db.collection('units').update(data, options, function(err,docs) {
					if(err) throw err;
					callback(docs);	
					db.close();
				});	
			}
			else if (operation == 'getHighestUnit') {
				db.collection('units').find(data, options).toArray(function(err,docs) {
					if(err) throw err;
					callback(docs);
					db.close();
				});
			}
		});
	}

	this.addUnit = function(name, protocol, model, house, td_id, type, dimmer, callback) {
		var id;
		//Find out the next value of id and unit
	    getHighestUnit(function(num) {
	    	//FIXME Starts at 2 if collections is empty
	    	id = num+1;
   
		    var data = {'_id':id,
		    	"name":name,
		    	"protocol":protocol,
		    	"model":model,
		    	"parameters":{"house":house,"unit":td_id},
		    	"currentvalue":"false",
		    	"type":type,
		    	"dimmer":dimmer,
		    	"currentDimValue":255
		    };
		    var options  = {};
		    con('addUnit', data, options, function(result) {
		    	callback(result);
		    }); 
	    });
	}

	this.removeUnit = function(_id, callback) {		
		    var data = {'_id':_id};
		    var options  = {};
		    con('removeUnit', data, options, function(result) {
		    	callback(result);
		    });
	}

	this.getHighestUnit = function(callback) {

	    var data = {'protocol':'arctech'};
	    var options = {'_id':1}
	    var high = 1;
	    con('getHighestUnit', data, options, function(result) {
	    	result.forEach(function (doc) {
	    		if (doc._id > high)
	    			high = doc._id;
	    	});
	    	callback(high);
	    }); 
		
	}

	this.toggleCurrentValue = function(_id, callback) {
		var data = {'_id':_id};
		var options = {'currentvalue':1,'_id':0};
		con('toggleCurrentValue', data, options, function(result) {
			if (result.currentvalue == 'false') {
				setCurrentValue(_id, 'true', function (result) {
					callback(result);
				});
			}
			else if (result.currentvalue == 'true') {
				setCurrentValue(_id, 'false', function (result) {
					callback(result);
				});
			}
		});
	}

	this.setCurrentValue = function(_id, value, callback) {
		var data = {'_id':_id};
		var options = {'$set':{'currentvalue':value}};
		con('setCurrentValue', data, options, function(docs) {
		  	callback(docs);
		});
	}

}

database();
exports.database = database;
