
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'piHomeAuto', subTitle: 'Enheter', noHeader: true });
};