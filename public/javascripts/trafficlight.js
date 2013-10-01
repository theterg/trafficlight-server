var socket = io.connect();
$(document).ready(function() {
  socket.on('update', function(data) {
    console.log('Update: ',data);
    if (('color' in data)&&('value' in data)) {
      if (data.value == 1) {
        $('#'+data.color+'.traffic_cell').addClass('active');
      } else {
        $('#'+data.color+'.traffic_cell').removeClass('active');
      }
    }
  });
  $('.traffic_cell').click(function() {
    socket.emit('toggle', this.id);
  });
});
