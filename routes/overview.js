/*
 * GET home page.
 */

exports.overview = function(req, res){
  res.render('overview', { title: 'piHomeAuto'});
};