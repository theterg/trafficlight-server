var Gpio = require('onoff').Gpio,
    async = require('async')

var colors = {
  red:    { pin: 10, gpio: null },
  yellow: { pin: 9, gpio: null  },
  green:  { pin: 11, gpio: null  }
};

console.log('Initializing GPIO');
for (var color in colors) {
  color = colors[color];
  console.log('Exporting pin '+color.pin);
  color.gpio = new Gpio(color.pin, 'out');
  color.gpio.write(0);
}

exports.availableColors = function() {
  var ret = [];
  for (color in colors) {
    ret.push(color);
  }
  return ret;
}

exports.getStatus = function() {
  var ret = [];
  for (color in colors) {
    ret[color] = colors[color].gpio.readSync();
  }
  return ret;
};

exports.getColor = function(color) {
  var ret = colors[color].gpio.readSync();
  return ret;
};

exports.turnOn = function(color, err) {
  if (!colors.hasOwnProperty(color)) {
    err('Color '+color+' not found');
    return;
  }
  colors[color].gpio.write(1, err);
};

exports.turnOff = function(color, err) {
  if (!colors.hasOwnProperty(color)) {
    err('Color '+color+' not found');
    return;
  }
  colors[color].gpio.write(0, err);
};

exports.toggle = function(color, err) {
  if (!colors.hasOwnProperty(color)) {
    err('Color '+color+' not found');
    return;
  }
  var pin = colors[color].gpio;
  pin.write(pin.readSync() === 0 ? 1 : 0, err);
};

exports.allOn = function(err) {
  var tasks = [];
  for (var color in colors) {
    var func = (function(color) {
      return function(err) {
        colors[color].gpio.write(1, err);
      }
    })(color);
    tasks.push(func);
  }
  async.series(tasks, err);
};

exports.allOff = function(err) {
  var tasks = [];
  for (var color in colors) {
    var func = (function(color) {
      return function(err) {
        colors[color].gpio.write(0, err);
      }
    })(color);
    tasks.push(func);
  }
  async.series(tasks, err);
};
