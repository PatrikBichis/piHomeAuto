
exports.initAddin = function(app, addin){
	var app = app;
	var addin = addin;

	app.get('/', function(req, res){
	  res.render('layout', { title: 'piHomeAuto', subTitle: 'Enheter på nätverket', viewModelFiles: addin.getViewModelFiles() , noHeader: true});
	});

	app.get('/Home', function(req, res){
	  res.render('HomeView', { title: 'piHomeAuto', subTitle: 'Enheter på nätverket', noHeader: true});
	});

}