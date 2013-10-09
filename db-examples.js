var database = require('./db').database();

//Finns ingen databas eller collection, så skapas den när första entryt skrivs.

/*
LÄGG TILL EN NY ENHET, ENHETS ID FÖR TDTOOLS LÄGGS IN MANUELLT
NAME,PROTOCOL,MODEL,HOUSE,ID,TYPE(tellstick from control collection),DIMMER
*/
database.addUnit('Min Enhet','arctech','selflearning-switch',17264 , 1, 1 , false, function(data) {
	console.log("Success! inserted " + JSON.stringify(data));
})

//HITTA HÖGSTA _id
// database.getHighestUnit(function(data) {
// 	console.log(data);
// })

//TA BORT EN ENHET 
// database.removeUnit(5,function(data) {
// 	if (data == 1)
// 		console.log('ok');
// 	else
// 		console.log('error occured');
// })


//TOGGLA CURRENTVALUE
// database.toggleCurrentValue(3,function(data) {
// 	if (data == 1)
//  		console.log('ok');
// 	else
//  		console.log('error occured');
// })