var Gpio = require('onoff').Gpio

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

var getColorMap = function() {
  return colors;
};

var turnOn = function(color, err) {
  if (!colors.hasOwnProperty(color)) {
    err('Color '+color+' not found');
    return;
  }
  colors[color].gpio.write(1, err);
};

var turnOff = function(color, err) {
  if (!colors.hasOwnProperty(color)) {
    err('Color '+color+' not found');
    return;
  }
  colors[color].gpio.write(0, err);
};

var toggle = function(color, err) {
  if (!colors.hasOwnProperty(color)) {
    err('Color '+color+' not found');
    return;
  }
  var pin = colors[color].gpio;
  pin.write(pin.readSync() === 0 ? 1 : 0, err);
};

var allOn = function(err) {

};

var allOff = function(err) {

};

exports.getColorMap = getColorMap;
exports.turnOn = turnOn;
exports.turnOff = turnOff;
exports.toggle = toggle;
exports.allOn = allOn;
exports.allOff = allOff;
