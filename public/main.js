console.log ("linked!");


$(document).ready(function(){
  $('#input').keyup(function(e){
    if (e.keyCode == 13) {
      var $item = $(this).val();
      $.post('/create', {description: $item},function(res){
      $('#list').append('<li>' + '<span class="remove">x</span>' + $item + '</li>');
      e.currentTarget.value = " "
      })
    }
  });

  $('.todo').on('click', function(e) {
    $(this).toggleClass('complete');
  });
});
