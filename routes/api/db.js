var MongoClient = require('mongodb').MongoClient;
var constring = 'mongodb://localhost:27017/piHomeAuto';


MongoClient.connect(constring, function(err,db) {
	if(err) throw err;

	function getAllUnits(callback) {
		var query = {};
		var projection = {'unitlist':1,'_id':0};
		db.collection('units').findOne(query, projection, function(err,docs) {
			if(err) throw err;
			callback(docs);
			db.close();
		});
			
	}

	function addUnit(id,name,callback) {
		// Do a search on 'id' to see which is the highest yet, and then increment.
		var doc = {}
    	var update = {'$push':{'unitlist':{'id':id,'name':name,'protocol':'arctech',
    		'model':'selflearning-switch','parameters':{'house':'17264','unit':id},
    		'currentvalue':false}}};

		db.collection('units').update(doc, update, function(err,inserted) {
			if(err) throw err;
			callback(inserted);
			db.close();
		});
			
	}

	function removeUnit(id,callback) {
		var doc = {}
    	var update = {'$pull':{'unitlist':{'id':id}}};
    	console.log('removed ' + id);
		db.collection('units').update(doc, update, function(err,deleted) {
			if(err) throw err;
			callback(deleted);
			db.close();
		});
			
	}

	function piHomeAutoDb() {
	if (arguments.callee._singletonInstance){
	 		return arguments.callee._singletonInstance;
		}
	 	arguments.callee._singletonInstance = this;

	 	this.getUnits = new getUnits();
	}

	

	/*getAllUnits(function(data) {
		console.log(data.unitlist[0].name);
	});*/
	/*addUnit(4, 'test', function(data) {
		if (data == 1)
			console.log('update ok');
		else
			console.log('update failed');
	});*/
	removeUnit(4, function(data) {
		console.log(data);
	});


exports.piHomeAutoDb = piHomeAutoDb;
});

