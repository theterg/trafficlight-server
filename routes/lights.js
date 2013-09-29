
/*
 * GET home page.
 */

var colors = {
  red:    { pin: 25 },
  yellow: { pin: 8 },
  green:  { pin: 7 }
};

var colorOnRoute = function(req, res) {
  var requestedColor = req.params.color;
  if (!colors.hasOwnProperty(requestedColor)) {
    res.send(500, 'Unknown color');
    return
  }
  res.send('ok');
};

var colorOffRoute = function(req, res) {
  var requestedColor = req.params.color;
  if (!colors.hasOwnProperty(requestedColor)) {
    res.send(500, 'Unknown color');
    return
  }
  res.send('ok');
};
var colorToggleRoute = function(req, res) {
  var requestedColor = req.params.color;
  if (!colors.hasOwnProperty(requestedColor)) {
    res.send(500, 'Unknown color');
    return
  }
  res.send('ok');
};

exports.addRoutes = function(app, basepath) {
  app.get(basepath+'/:color/on', colorOnRoute);
  app.get(basepath+'/:color/off', colorOffRoute);
  app.get(basepath+'/:color/toggle', colorToggleRoute);
};
