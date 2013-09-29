
/*
 * GET home page.
 */
var lights = require('./lights');

var index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.addRoutes = function(app) {
  app.get('/', index);
  lights.addRoutes(app, '/light');
};
