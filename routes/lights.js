
/*
 * GET home page.
 */

var lightdriver = require('../drivers/lightdriver');

var colorOnRoute = function(req, res) {
  lightdriver.turnOn(req.params.color, function(err) {
    if (err) {
      res.send(500, err);
    }
    res.send('ok');
  });
};

var colorOffRoute = function(req, res) {
  lightdriver.turnOff(req.params.color, function(err) {
    if (err) {
      res.send(500, err);
    }
    res.send('ok');
  });
};
var colorToggleRoute = function(req, res) {
  lightdriver.toggle(req.params.color, function(err) {
    if (err) {
      res.send(500, err);
    }
    res.send('ok');
  });
};

exports.addRoutes = function(app, basepath) {
  colors = lightdriver.getColorMap();
  app.get(basepath+'/:color/on', colorOnRoute);
  app.get(basepath+'/:color/off', colorOffRoute);
  app.get(basepath+'/:color/toggle', colorToggleRoute);
};
