$(document).ready(function() {
  $('.traffic_cell').click(function() {
    console.log('Clicked: ', this.id);
    $.get('./light/'+this.id+'/toggle');
    $(this).toggleClass('active');
  });
});
