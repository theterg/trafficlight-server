
var io = {};

exports.sendUpdate = function(color, value) {
  io.sockets.emit('update', {
    color: color,
    value: value
  });
};

exports.addListeners = function(app) {
  io = app.trafficlight.io;
  io.sockets.on('connection', function(socket) {
    var status = app.trafficlight.driver.getStatus();
    for (var color in status) {
      socket.emit('update', {
        color: color,
        value: status[color]
      });
    }
    socket.on('turnOn', function(color) {
      app.trafficlight.driver.turnOn(color);
      exports.sendUpdate(color, 1);
    });
    socket.on('turnOff', function(color) {
      app.trafficlight.driver.turnOff(color);
      exports.sendUpdate(color, 0);
    });
    socket.on('toggle', function(color) {
      app.trafficlight.driver.toggle(color);
      exports.sendUpdate(color, app.trafficlight.driver.getColor(color));
    });
  });
};
