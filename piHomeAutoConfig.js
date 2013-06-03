function tellstick(){
	var self = this;

	self.user = "nobody";
	self.group = "plugdev";
	self.ignoreControllerConfirmation = "false";


	self.units = [
		{	
			id : 1,
			name : "F"+unescape("%F6")+"nsterlampa i kontoret",
			protocol : "arctech",
			model : "selflearning-switch",
			parameters : {house : "1", unit : "1"},
			currentValue : false
		},{	
			id : 2,
			name : "Trapstegsljus",
			protocol : "arctech",
			model : "selflearning-switch",
			parameters : {house : "1", unit : "2"},
			currentValue : false
		},{	
			id : 3,
			name : "F"+unescape("%F6")+"nsterlampor i vardagsrummet",
			protocol : "arctech",
			model : "selflearning-switch",
			parameters : {house : "1", unit : "3"},
			currentValue : false
		},{	
			id : 4,
			name : "Lampor p"+unescape("%E5")+" inneg"+unescape("%E5")+"rd",
			protocol : "arctech",
			model : "selflearning-switch",
			parameters : {house : "1", unit : "4"},
			currentValue : false
		},{	
			id : 5,
			name : "F"+unescape("%F6")+"nsterlampa i k"+unescape("%F6")+"ket",
			protocol : "arctech",
			model : "selflearning-switch",
			parameters : {house : "426", unit : "1"},
			currentValue : false
		},{	
			id : 6,
			name : "Bordslampa i hallen",
			protocol : "arctech",
			model : "selflearning-switch",
			parameters : {house : "426", unit : "2"},
			currentValue : false
		},{	
			id : 7,
			name : "F"+unescape("%F6")+"nsterlampa i sovrum",
			protocol : "arctech",
			model : "selflearning-switch",
			parameters : {house : "426", unit : "3"},
			currentValue : false
		}
	];
}

function piHomeAutoConfig () {
	if (arguments.callee._singletonInstance){
 		return arguments.callee._singletonInstance;
	}
 	arguments.callee._singletonInstance = this;

 	this.tellstickConfig = new tellstick();
 }
 
piHomeAutoConfig();
exports.piHomeAutoConfig = piHomeAutoConfig;

