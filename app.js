
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var driver = require('./drivers/lightdriver');
var io = require('socket.io');

var app = express();

// Make our own namespace on App
app.trafficlight = {};
app.trafficlight.driver = driver;

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes.addRoutes(app);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  app.trafficlight.io = io.listen(server);
  app.trafficlight.io.sockets.on('connection', function(socket) {
    var status = app.trafficlight.driver.getStatus();
    for (var color in status) {
      socket.emit('update', {
        color: color,
        value: status[color]
      });
    }
    socket.on('turnOn', function(color) {
      app.trafficlight.driver.turnOn(color);
      app.trafficlight.io.sockets.emit('update', {
        color: color,
        value: 1
      });
    });
    socket.on('turnOff', function(color) {
      app.trafficlight.driver.turnOff(color);
      app.trafficlight.io.sockets.emit('update', {
        color: color,
        value: 0
      });
    });
    socket.on('toggle', function(color) {
      app.trafficlight.driver.toggle(color);
      app.trafficlight.io.sockets.emit('update', {
        color: color,
        value: app.trafficlight.driver.getColor(color)
      });
    });
  });

});
