
/*
 * GET home page.
 */
var lights = require('./lights');
var websocket = require('./websocket');
var driver = {}

var index = function(req, res){
  var colors = driver.getStatus();
  res.render('index', {
    title: 'Trafficlight',
    status: colors
  });
};

exports.addRoutes = function(app) {
  driver = app.trafficlight.driver;
  app.get('/', index);
  lights.addRoutes(app, '/light');
};

exports.addListeners = function(app) {
  websocket.addListeners(app);
}
