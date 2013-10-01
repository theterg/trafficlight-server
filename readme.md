Trafficlight-server
===================

A node.js application for a raspberry pi.  A raspberry pi is plugged
into 3 (or more) lights via GPIO pins.  This project exposes the lights
via a simple web/websockets/socket interface.  Designed specifically for
a traffic light, but could be expanded to any number of lights with
unique names.

Endpoints (assuming hostname of 'raspberrypi'):
* http://raspberrypi/
    * A simple, clickable web interface - multi user!
* http://raspberrypi/light/<color>/on
    * Turn on the light (red, yellow, green)
* http://raspberrypi/light/<color>/off
    * Turn off the light
* http://raspberrypi/light/<color>/toggle
    * Toggle the light
* http://raspberrypi/all/on
    * Turn all lights on
* http://raspberrypi/all/off
    * Turn all lights off

Server consumes the following websocket events:
* 'turnOn' - payload: 'color'
    * color is a simple string ('red', 'yellow', 'green')
* 'turnOff' - payload: 'color'
    * color is a simple string ('red', 'yellow', 'green')
* 'toggle' - payload: 'color'
    * color is a simple string ('red', 'yellow', 'green')

Server emits the following websocket event:
* 'update' - payoad: { 'color': color, 'value': value }
    * color is a simple string ('red', 'yellow', 'green')
    * value is an integer - 0 is off, 1 is on
