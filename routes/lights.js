
/*
 * GET home page.
 */

var lightdriver = {}

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

var allOnRoute = function(req, res) {
  lightdriver.allOn(function(err) {
    if (err) {
      res.send(500, err);
    }
    res.send('ok');
  });
};

var allOffRoute = function(req, res) {
  lightdriver.allOff(function(err) {
    if (err) {
      res.send(500, err);
    }
    res.send('ok');
  });
};

exports.addRoutes = function(app, basepath) {
  lightdriver = app.trafficlight.driver;
  app.get(basepath+'/all/on', allOnRoute);
  app.get(basepath+'/all/off', allOffRoute);
  app.get(basepath+'/:color/on', colorOnRoute);
  app.get(basepath+'/:color/off', colorOffRoute);
  app.get(basepath+'/:color/toggle', colorToggleRoute);
};
