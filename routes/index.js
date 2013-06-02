
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'piHomeAuto' });
};

exports.net = function(req, res){
	  res.render('net', { title: 'piHomeAuto' });
	};